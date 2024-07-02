import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import RequestError from './RequestError';

const cookies = new Cookies();

class Request {
  axios: AxiosInstance = axios.create();

  accessToken = '';

  async get(url: string) {
    try {
      const res = await this.axios.get(url);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new RequestError(
          err.response?.data?.message ??
            'An unknown error occurred during the request.',
          err.response?.status ?? 400,
        );
      }
      throw new RequestError('An unknown error occurred', 400);
    }
  }

  async post(url: string, data: object) {
    try {
      const res = await this.axios.post(url, data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new RequestError(
          err.response?.data?.message ??
            'An unknown error occurred during the request.',
          err.response?.status ?? 400,
        );
      }
      throw new RequestError('An unknown error occurred', 400);
    }
  }

  async put(url: string, data: object) {
    try {
      const res = await this.axios.put(url, data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new RequestError(
          err.response?.data?.message ??
            'An unknown error occurred during the request.',
          err.response?.status ?? 400,
        );
      }
      throw new RequestError('An unknown error occurred', 400);
    }
  }

  async delete(url: string, data?: object) {
    try {
      const res = await this.axios.delete(url, { data });
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new RequestError(
          err.response?.data?.message ??
            'An unknown error occurred during the request.',
          err.response?.status ?? 400,
        );
      }
      throw new RequestError('An unknown error occurred', 400);
    }
  }

  async setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}

const request = new Request();

// request.axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
request.axios.defaults.baseURL = 'http://localhost:5001';
request.axios.defaults.withCredentials = true;

request.axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.request &&
      error.request.status === 0 &&
      window.location.pathname !== '/network_error'
    ) {
      window.location.href = '/network_error';
    }

    const token = cookies.get('ft-at') as string;
    const refresher = cookies.get('ft-rt') as string;
    if (!token) throw error;

    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      try {
        const res = await request.axios.post('/auth/refresh', {
          token: refresher,
        });
        if (res.status === 200) {
          request.setAccessToken(res.data.credentials.access);
          cookies.set('ft-at', res.data.credentials.access, {
            path: '/',
            sameSite: 'strict',
          });
          cookies.set('ft-rt', res.data.credentials.refresh, {
            path: '/',
            sameSite: 'strict',
          });
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${res.data.credentials.access}`,
          };
          return request.axios(originalRequest);
        }
      } catch (refreshError) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.data.error.code === 400 ||
            error.response?.data.error.code === 401)
        ) {
          cookies.remove('ft-at');
          cookies.remove('ft-rt');
          toast.error('Invalid refresh token, logged out');
          window.location.href = '/';
        }
      }
    }

    if (error.response.status === 403) {
      toast.remove();
      toast.error('Invalid token, logged out');
      cookies.remove('ft-at');
      cookies.remove('ft-rt');
      request.setAccessToken('');
      window.location.href = '/';
    }

    if (error.response.status === 409) {
      toast.remove();
      window.location.href = '/';
    }

    throw error;
  },
);

export default request;
