import { createCookie, readCookie, removeCookie } from 'src/common/cookie';

export const getAccessToken = () => {
  return readCookie('token');
};

export const setAccessToken = (token: string) => {
  createCookie('token', token);
};

export const clearAccessToken = () => {
  removeCookie('token');
};
