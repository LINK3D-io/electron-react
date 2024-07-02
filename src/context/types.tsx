import { Preferences } from '../domain/preferences';
import { CurrentUser, EmailVerificationStatus } from '../domain/user';

export const coinActions = {
  SET_COINS: 'SET_COINS',
  SET_SUBSCRIBED: 'SET_SUBSCRIBED',
};

export const localPreferenceActions = {
  setPostFilterType: 'setPostFilterType',
  setPostModeType: 'setPostModeType',
  setPostSortBy: 'setPostSortBy',
  SET_THEME: 'SET_THEME',
  setMuteVideo: 'setMuteVideo',
  setBotFilter: 'setBotFilter',
  setDataMode: 'setDataMode',
};

export const awardActions = {
  SET_AWARDS: 'SET_AWARDS',
};

export const botSettingActions = {
  SET_MODELS: 'SET_MODELS',
};

export const preferenceActions = {
  SET_PREFERENCE: 'SET_PREFERENCE',
};

export const navigatorActions = {
  SET_BACK_PATH: 'SET_BACK_PATH',
  SET_LOGO_CLICKED: 'SET_LOGO_CLICKED',
};

export const userActions = {
  SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED',
  SET_AUTH_ERROR: 'SET_AUTH_ERROR',
  SET_USER: 'SET_USER',
  SET_PENDING_NOTIFICATIONS_COUNT: 'SET_PENDING_NOTIFICATIONS_COUNT',
  SET_BLOCKED_USER: 'SET_BLOCKED_USER',
  REMOVE_USER_FROM_BLOCKED_USERS: 'REMOVE_USER_FROM_BLOCKED_USERS',
  ADD_COINS: 'ADD_COINS',
  REMOVE_COINS: 'REMOVE_COINS',
  UPDATE_PINNED_FACTIIIS: 'UPDATE_PINNED_FACTIIIS',
};

export const factiiiActions = {
  SET_FACTIIIS: 'SET_FACTIIIS',
  ADD_FACTIII_ITEM: 'ADD_FACTIII_ITEM',
  ADD_FACTIII_ITEMS: 'ADD_FACTIII_ITEMS',
  REMOVE_FACTIII_ITEM: 'REMOVE_FACTIII_ITEM',
};

export const spaceActions = {
  ADD_PINNED_FACTIII: 'ADD_PINNED_FACTIIII',
  REMOVE_PINNED_FACTIII: 'REMOVE_PINNED_FACTIII',
  UPDATE_SPACE_SLUG: 'UPDATE_SPACE_SLUG',
  ADD_RULE: 'ADD_RULE',
  UPDATE_RULES: 'UPDATE_RULES',
};

export type LocalPreferenceState = {
  postFilterType: 'trending' | 'new' | 'popular' | null;
  postModeType: 'home' | 'explore' | null;
  theme: 'light' | 'dark' | null;
  muteVideo: boolean;
  filterBot: boolean;
  dataMode: boolean;
};

export type NavigatorState = {
  backPath?: string;
  logoClicked: boolean;
};

export type UserState = {
  user: CurrentUser;
};

export const initialUserState: UserState = {
  user: {
    types: [],
    isAuthenticated: null,
    authError: false,
    id: 0,
    name: 'Factiii User',
    username: '',
    email: '',
    emailVerificationStatus: EmailVerificationStatus.UNVERIFIED,
    bio: '',
    avatar: '/images/display-image-default.png',
    banner: '',
    coinsBalance: 0,
    followersCount: 0,
    followingCount: 0,
    twoFaEnabled: false,
    premiumExpires: undefined,
    tronsBalance: 0,
    isModerator: false,
    pendingNotificationsCount: 0,
    factiiiIds: [],
    blockedUsers: [],
    spaceFilterIds: [],
    blockedByUser: false,
    blocked: false,
    muted: false,
  },
};

export const initialLocalPreferenceState: LocalPreferenceState = {
  postFilterType: null,
  postModeType: null,
  theme: null,
  muteVideo: false,
  filterBot: false,
  dataMode: false,
};

export const initialNavigatorState: NavigatorState = {
  backPath: undefined,
  logoClicked: false,
};

export const initialPreferenceState: Preferences = {
  awardsVisibilityPrivate: false,
  allowProfanity: false,
  betaAccess: false,
  allowPoliticalContent: false,
  hidePostsOnProfile: false,
  hideProfileHistory: false,
  allowNSFWContent: false,
};
