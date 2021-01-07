import * as DateFns from 'date-fns';
import { GetServerSideProps, NextPageContext } from 'next';
import { APIClient } from 'shared';
import classNames from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';
import { API_URL } from 'src/config';
import { readCookieFromString } from './cookie';
import { ClassValue } from 'classnames/types';

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(
      `Unreachable case: ${typeof val === 'string' ? val : JSON.stringify(val)}`
    );
  }
}

export function getErrorMessage(e: any) {
  if (e?.status === 0) {
    return 'Cannot connect to API';
  }
  const message = e?.response?.error || e.message;
  return message.replace('ContractError: ', '');
}

export function createSSRClient<
  T extends {
    req?: NextPageContext['req'];
  }
>(ctx: T) {
  const token = readCookieFromString(
    ctx?.req?.headers['cookie'] ?? '',
    'token'
  );
  return new APIClient(API_URL, () => token, fetch);
}

export function safeAssign<T>(obj: T, values: Partial<T>) {
  return Object.assign(obj, values);
}

export function safeExtend<T, U>(obj: T, values: U): T & U {
  return Object.assign(obj, values);
}

export function safeKeys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as any;
}

export const cx = (...classes: ClassValue[]) =>
  overrideTailwindClasses(classNames(...classes));

export function formatShortDate(data: string | Date) {
  return DateFns.format(new Date(data), 'dd/MM/yyyy');
}

export const createGetServerSideProps: (
  fn: GetServerSideProps
) => GetServerSideProps = fn => async context => {
  try {
    return await fn(context);
  } catch (e) {
    const status = e.res?.status;
    if (status == 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    throw e;
  }
};
