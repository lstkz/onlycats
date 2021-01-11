import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent } from 'react';
import { Profile } from 'shared';
import { useImmer } from 'use-immer';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './Button';
import { api } from 'src/services/api';

interface Actions {
  showSubscribe: () => void;
}

interface State {
  isOpen: boolean;
  isLoading: boolean;
  error: string;
}

const SubscribeModalContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface SubscribeModalProps {
  profile: Profile;
  children: React.ReactNode;
  onSubscribed?: () => void;
}

export function SubscribeModalModule(props: SubscribeModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { children, profile, onSubscribed } = props;
  const [state, setState] = useImmer<State>({
    isOpen: false,
    error: '',
    isLoading: false,
  });
  const actions = React.useMemo<Actions>(
    () => ({
      showSubscribe: () => {
        setState(draft => {
          draft.isOpen = true;
        });
      },
    }),
    []
  );

  const close = () =>
    setState(draft => {
      draft.isOpen = false;
    });

  const { isOpen, error, isLoading } = state;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || isLoading) {
      return;
    }
    const cardElement = elements.getElement(CardElement)!;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      setState(draft => {
        draft.error = error.message!;
      });
      return;
    }
    await api.payment_subscribe({
      paymentMethodId: paymentMethod!.id,
      username: profile.username,
    });
    if (onSubscribed) {
      onSubscribed();
    }
    close();
  };

  return (
    <SubscribeModalContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
      {isOpen && (
        <>
          <div className="fixed left-0 top-0 right-0 bottom-0 bg-black opacity-60" />
          <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center p-4">
            <form
              onSubmit={async e => {
                try {
                  setState(draft => {
                    draft.isLoading = true;
                  });
                  await handleSubmit(e);
                } catch (e) {
                  setState(draft => {
                    draft.error = e.message;
                  });
                } finally {
                  setState(draft => {
                    draft.isLoading = false;
                  });
                }
              }}
              className="bg-white w-full max-w-xl p-4 rounded-lg relative"
            >
              <button onClick={close} className="absolute right-1 top-1 px-1">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="text-center mb-4">
                Subscribe to @{profile.username}
              </div>
              <div
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-md py-3 px-2 leading-tight focus:outline-none focus:bg-white"
                id="card-element"
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#32325d',
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                        '::placeholder': {
                          color: '#a0aec0',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
                <div className="mt-4">
                  <Button htmlType="submit">
                    {isLoading ? 'Working...' : 'Pay'}
                  </Button>
                </div>
              </div>
              <div className="text-gray-700 text-base mt-2" role="alert">
                {error}
              </div>
            </form>
          </div>
        </>
      )}
    </SubscribeModalContext.Provider>
  );
}

function useContext() {
  const context = React.useContext(SubscribeModalContext);
  if (!context) {
    throw new Error('SubscribeModalContext is not set');
  }
  return context;
}

export function useSubscribeModalActions() {
  return useContext().actions;
}
