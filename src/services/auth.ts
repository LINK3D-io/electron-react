import { CredentialsObject } from '../domain/auth';
import request from './request';

type AuthResponse = {
  credentials: CredentialsObject;
};

export const register = (
  username: string,
  email: string,
  password: string,
  types: Array<string>,
  referrerUserId?: string,
): Promise<AuthResponse> => {
  return request.post('/auth/register', {
    username,
    email,
    password,
    types,
    referrerUserId,
  });
};

export const login = (
  username: string,
  password: string,
  code?: string,
): Promise<AuthResponse> => {
  // user can login with either username/email. The backend will handle it.
  return request.post('/auth/login', {
    username,
    password,
    code,
  });
};

export const sendResetTwoFaEmail = (
  username: string,
  password: string,
): Promise<{ success: boolean }> => {
  return request.post('/auth/twoFa-reset', {
    username,
    password,
  });
};

export const logout = () => {
  return request.get('/auth/logout');
};

export const updateDetails = (payload: {
  username?: string;
  email?: string;
}): Promise<{ updated: boolean }> => {
  return request.post('/auth/update', payload);
};

export const enable2FA = (): Promise<{ secret: string }> => {
  return request.post(`/auth/2fa/enable`, {});
};

export const disable2FA = (
  password: string,
): Promise<{ disabled: boolean }> => {
  return request.post(`/auth/2fa/disable`, {
    password,
  });
};

export const sendVerificationEmail = (email: string) => {
  return request.post('/auth/send-verification-email', {
    email,
  });
};

export const verifyEmail = (email: string, otp: string) => {
  return request.post('/auth/verify-email', {
    email,
    otp,
  });
};
