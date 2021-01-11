import { S } from 'schema';
import { UserCollection, UserModel } from '../../collections/User';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding, stripe } from '../../lib';

async function _ensureCustomer(user: UserModel) {
  if (!user.customerId) {
    const customer = await stripe.customers.create(
      {},
      {
        idempotencyKey: `create_customer_${user._id}`,
      }
    );
    user.customerId = customer.id;
    await UserCollection.update(user, ['customerId']);
  }
}

async function _ensureProduct(user: UserModel) {
  if (user.priceId) {
    return;
  }
  if (!user.productId) {
    const product = await stripe.products.create(
      {
        name: user._id.toHexString(),
      },
      {
        idempotencyKey: `create_product_${user._id}`,
      }
    );
    user.productId = product.id;
    await UserCollection.update(user, ['productId']);
  }
  const price = await stripe.prices.create(
    {
      currency: 'usd',
      product: user.productId,
      recurring: {
        interval: 'month',
        interval_count: 1,
      },
      unit_amount: 500,
    },
    {
      idempotencyKey: `create_price_${user._id}`,
    }
  );
  user.priceId = price.id;
  await UserCollection.update(user, ['priceId']);
}

export const subscribe = createContract('payment.subscribe')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      paymentMethodId: S.string(),
      username: S.string(),
    }),
  })
  .returns<{
    id: string;
  }>()
  .fn(async (user, values) => {
    const targetUser = await UserCollection.findOne({
      username_lowered: values.username.toLowerCase(),
    });
    if (!targetUser) {
      throw new AppError('User not found ');
    }
    await _ensureCustomer(user);
    await _ensureProduct(targetUser);
    const customerId = user.customerId!;
    await stripe.paymentMethods.attach(values.paymentMethodId, {
      customer: customerId,
    });
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: values.paymentMethodId,
      },
    });
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: targetUser.priceId! }],
      expand: ['latest_invoice.payment_intent'],
    });
    if (subscription.status !== 'active') {
      throw new AppError('Not active TODO');
    }
    await UserSubscriptionCollection.insertOne({
      _id: subscription.id,
      targetUserId: targetUser._id,
      userId: user._id,
    });

    return {
      id: subscription.id,
    };
  });

export const subscribeRpc = createRpcBinding({
  injectUser: true,
  signature: 'payment.subscribe',
  handler: subscribe,
});
