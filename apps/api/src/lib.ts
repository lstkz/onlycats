import { ContractMeta, initialize } from 'contract';
import { ObjectSchema, StringSchema } from 'schema';
import AWS from 'aws-sdk';
import Stripe from 'stripe';
import { AppUser } from './types';
import { ObjectID } from 'mongodb';
import { config } from './config';

export interface CreateRpcBindingOptions {
  injectUser?: boolean;
  public?: true;
  wrapAsValues?: true;
  signature: string;
  handler: ((...args: any[]) => any) & ContractMeta<any>;
}

export interface BaseBinding<T, U> {
  isBinding: boolean;
  type: T;
  options: U;
}

export interface RpcBinding
  extends BaseBinding<'rpc', CreateRpcBindingOptions> {}

export function createRpcBinding(options: CreateRpcBindingOptions): RpcBinding {
  return {
    isBinding: true,
    type: 'rpc',
    options,
  };
}

export const s3 = new AWS.S3({
  region: 'eu-central-1',
});

export const { createContract } = initialize({
  debug: process.env.NODE_ENV === 'development',
});

declare module 'schema/src/StringSchema' {
  interface StringSchema<TReq, TNull, TOutput> {
    objectId(): StringSchema<TReq, TNull, ObjectID>;
  }
}

declare module 'schema/src/ObjectSchema' {
  interface ObjectSchema<TReq, TNull, TKeys> {
    appUser(): ObjectSchema<TReq, TNull, AppUser>;
  }
}

StringSchema.prototype.objectId = function objectId(this: StringSchema) {
  return this.regex(/^[a-f0-9]{24}$/)
    .input(value => (value?.toHexString ? value.toHexString() : value))
    .output<ObjectID>(value => ObjectID.createFromHexString(value));
};

ObjectSchema.prototype.appUser = function appUser(this: ObjectSchema) {
  return this.as<AppUser>().unknown();
};

export const stripe = new Stripe(config.stripe.secret, {
  apiVersion: '2020-08-27',
});
