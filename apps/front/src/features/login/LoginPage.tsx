import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from 'src/components/Input';
import { Button } from 'src/components/Button';
import { api } from 'src/services/api';
import { getErrorMessage } from 'src/common/helper';
import { AuthPage } from 'src/components/AuthPage';
import Link from 'next/Link';
import { useAuthActions } from 'src/components/AuthModule';

interface LoginPageProps {}

interface RegisterFormValues {
  username: string;
  password: string;
}

const schema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export function LoginPage(props: LoginPageProps) {
  const { handleSubmit, register, errors } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = React.useState('');
  const { handleAuth } = useAuthActions();

  return (
    <AuthPage
      title="Login"
      error={error}
      bottom={
        <Link href="/register">
          <a>Register here</a>
        </Link>
      }
    >
      <form
        onSubmit={handleSubmit(async values => {
          try {
            const data = await api.user_login(values);
            handleAuth(data);
          } catch (e) {
            setError(getErrorMessage(e));
          }
        })}
      >
        <div>
          <Input
            label="Username"
            placeholder="username"
            name="username"
            ref={register}
            error={errors.username?.message}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            ref={register}
            error={errors.password?.message}
          />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </AuthPage>
  );
}
