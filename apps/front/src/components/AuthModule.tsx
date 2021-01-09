import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { AuthData, User } from 'shared';
import { clearAccessToken, setAccessToken } from 'src/services/Storage';
import { useImmer } from 'use-immer';

interface Actions {
  logout: () => void;
  setUser: (user: User) => void;
  handleAuth: (authData: AuthData) => void;
}

interface State {
  user: User | null;
}

const AuthContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface AuthProps {
  initialUser: User | null;
  children: React.ReactNode;
}

export function AuthModule(props: AuthProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>({ user: props.initialUser });
  const router = useRouter();
  const actions = React.useMemo<Actions>(
    () => ({
      logout: () => {
        clearAccessToken();
        void router.push('/login');
      },
      setUser: user => {
        setState(draft => {
          draft.user = user;
        });
      },
      handleAuth: data => {
        const { token, user } = data;
        setAccessToken(token);
        setState(draft => {
          draft.user = user;
        });
        void router.push('/home');
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext is not set');
  }
  return context;
}

export function useAuthActions() {
  return useContext().actions;
}

export function useUser() {
  return useContext().state.user;
}
