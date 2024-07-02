import { Link } from './tags';
import { Preferences } from './preferences';

export enum UserType {
  PRIVATE = 'PRIVATE',
  ADMIN = 'ADMIN',
}

export enum EmailVerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

// This exists because the Details return has preferences inside of it while CurrentUser does not
export type DetailsReturn = {
  types: UserType[];
  isAuthenticated: boolean | null;
  authError: boolean;
  id: number;
  name: string;
  preferences: Preferences;
  username: string;
  email: string;
  emailVerificationStatus: EmailVerificationStatus;
  bio: string;
  avatar: string;
  banner: string | null;
  coinsBalance: number;
  tronsBalance: number;
  followersCount: number;
  followingCount: number;
  twoFaEnabled: boolean;
  twoFaSecret?: string;
  premiumExpires?: Date;
  isModerator?: boolean;
  pendingNotificationsCount: number;
  factiiiIds: number[];
  blockedUsers: string[];
  spaceFilterIds: number[];
  blockedByUser: boolean;
  following?: boolean;
  blocked: boolean;
  muted: boolean;
};

// User object for the logged in User. Do Not Use for other users.
// This reads the DetailsReturn type and removes the preferences field so it can be placed in it's own context
export type CurrentUser = Omit<DetailsReturn, 'preferences' | 'following'>;

// User object for all users that are not the current user
export type User = Pick<
  CurrentUser,
  | 'id'
  | 'name'
  | 'username'
  | 'bio'
  | 'avatar'
  | 'banner'
  | 'followersCount'
  | 'followingCount'
> & {
  following: boolean | null;
};

export type PublicDetails = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  banner: string;
  links: Link[];
  blockedByUser: boolean;
  muted: boolean;
};

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  name?: string;
  bio?: string;
  avatarId?: string;
  bannerId?: string;
  robohash?: string;
};

export type ProfileHistoryItem = {
  key: 'name' | 'username' | 'bio' | 'avatar' | 'banner' | 'robohash';
  value: string;
  date: Date;
};
