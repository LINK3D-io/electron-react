import { Preferences } from '../domain/preferences';
import {
  DetailsReturn,
  ProfileHistoryItem,
  PublicDetails,
  UpdateUserPayload,
} from '../domain/user';
import request from './request';

export type ProfileHistoryItemProps = {
  name: string;
  username: string;
  date: Date | 'current';
  banner: string;
  avatar: string;
  robohash: string;
  bio: string;
  changeKey: 'username' | 'name' | 'bio' | 'avatar' | 'banner' | 'robohash';
};

export const setSocketId = (socketId: string | null) => {
  return request.put('/users/setSocket', {
    socketId,
  });
};

export const publicDetails = (username: string): Promise<PublicDetails> => {
  return request.get(`/users/details/${username}`);
};

export const details = (): Promise<DetailsReturn> => {
  return request.get(`/users/details`);
};

export const updateUser = (payload: UpdateUserPayload) => {
  return request.put('/users/details', payload);
};

export const deactivateUser = (password: string) => {
  return request.post('/users/deactivate', {
    password,
  });
};

export const updatePreferences = (
  payload: Preferences,
): Promise<{ updated: boolean }> => {
  return request.post('/users/preferences', {
    payload,
  });
};

export const pinPostToProfile = (postId: string) => {
  return request.post(`/users/pin/${postId}`, {});
};

export const unpinPostFromProfile = () => {
  return request.post(`/users/unpin`, {});
};

export const getProfileHistory = (
  username: string,
): Promise<{
  history: ProfileHistoryItem[];
  currentData: ProfileHistoryItemProps;
}> => {
  return request.get(`/users/history/${username}`);
};

export const addToWaitlist = (email: string) => {
  return request.post(`/users/waitlist`, { email });
};

export const blockedUsers = () => {
  return request.get('/users/blocked-users');
};
