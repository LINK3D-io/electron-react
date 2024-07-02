import { useUserState } from '../context/UserContext';
import { userActions } from '../context/types';
import { CurrentUser } from '../domain/user';

const useUser = () => {
  const { state, dispatch } = useUserState();

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    dispatch({
      type: userActions.SET_IS_AUTHENTICATED,
      payload: isAuthenticated,
    });
  };

  const setAuthError = (authError: boolean) => {
    dispatch({ type: userActions.SET_AUTH_ERROR, payload: authError });
  };

  const setUser = (user: CurrentUser) => {
    dispatch({ type: userActions.SET_USER, payload: user });
  };

  const setPendingNotificationsCount = (count: number) => {
    dispatch({
      type: userActions.SET_PENDING_NOTIFICATIONS_COUNT,
      payload: count,
    });
  };

  const setBlockedUser = (username: string) => {
    dispatch({ type: userActions.SET_BLOCKED_USER, payload: username });
  };

  const removeUserFromBlockedUsers = (username: string) => {
    dispatch({
      type: userActions.REMOVE_USER_FROM_BLOCKED_USERS,
      payload: username,
    });
  };

  const addCoins = (coinsBalance: number) => {
    dispatch({ type: userActions.ADD_COINS, payload: coinsBalance });
  };

  return {
    user: state.user,
    setIsAuthenticated,
    setAuthError,
    setUser,
    setPendingNotificationsCount,
    setBlockedUser,
    removeUserFromBlockedUsers,
    addCoins,
  };
};

export default useUser;
