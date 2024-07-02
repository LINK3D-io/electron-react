import _ from 'lodash';
import { initialUserState, userActions, UserState } from '../types';

// eslint-disable-next-line default-param-last
const userReducer = (state: UserState = initialUserState, action: any) => {
  console.log('userReducer', state, action);
  switch (action.type) {
    case userActions.SET_IS_AUTHENTICATED:
      return {
        ...state,
        user: { ...state.user, isAuthenticated: action.payload },
      };
    case userActions.SET_AUTH_ERROR:
      return { ...state, user: { ...state.user, authError: action.payload } };
    case userActions.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          types: action.payload.types,
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          emailVerificationStatus: action.payload.emailVerificationStatus,
          bio: action.payload.bio,
          avatar: action.payload.avatar,
          banner: action.payload.banner,
          coinsBalance: action.payload.coinsBalance,
          followersCount: action.payload.followersCount,
          followingCount: action.payload.followingCount,
          twoFaEnabled: action.payload.twoFaEnabled,
          premiumExpires: action.payload.premiumExpires,
          tronsBalance: action.payload.tronsBalance,
          isModerator: action.payload.isModerator,
          pendingNotificationsCount: action.payload.pendingNotificationsCount,
          blockedUsers: action.payload.blockedUsers,
        },
      };
    case userActions.SET_BLOCKED_USER:
      return {
        ...state,
        user: {
          ...state.user,
          blockedUsers: _.uniq([action.payload, ...state.user.blockedUsers]),
        },
      };
    // case userActions.REMOVE_USER_FROM_BLOCKED_USERS:
    //   const blockedUsers = state.user.blockedUsers.filter(
    //     (name) => name !== action.payload,
    //   );
    //   return { ...state, user: { ...state.user, blockedUsers } };
    case userActions.ADD_COINS:
      return {
        ...state,
        user: {
          ...state.user,
          coinsBalance: state.user.coinsBalance + action.payload,
          tronsBalance: state.user.tronsBalance + action.payload * 5000,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
