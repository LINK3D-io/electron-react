import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { initialUserState } from '../context/types';
import { logout as logoutService } from '../services/auth';
import request from '../services/request';
import { details, setSocketId } from '../services/users';
import useUser from './useUser';

const useAuth = () => {
  const { user, setIsAuthenticated, setAuthError, setUser } = useUser();

  const cookies = new Cookies();

  const logout = async (error?: any) => {
    if (request.accessToken) {
      await setSocketId(null); // nullify the socketId in the server
      await logoutService();
    }
    // No access token so clear out all credentials and user data
    request.setAccessToken('');
    // this removes all cookies
    // document.cookie
    //   .split(';')
    //   .forEach(
    //     (c) =>
    //       (document.cookie = c
    //         .replace(/^ +/, '')
    //         .replace(
    //           /=.*/,
    //           '=;expires=' + new Date().toUTCString() + ';path=/',
    //         )),
    //   );
    // default user state
    setIsAuthenticated(false);
    setUser(initialUserState.user);
    // setPreferences(initialPreferenceState);
    if (error) {
      setAuthError(true);
      // router.push('/');
      if (error.message) {
        toast.error(`${error.message}. Please login again.`);
      } else {
        toast.error(
          'Session has been remotely terminated. Please login again.',
        );
      }
    }
  };

  const initializeUser = async (accessToken: string) => {
    try {
      await request.setAccessToken(accessToken);
      const data = await details();
      if (!data.email || !data.id || !data.username) {
        return false;
      }
      setAuthError(false);
      setIsAuthenticated(true);
      setUser(data);
    } catch (error: any) {
      logout(error);
    }
    return true;
  };

  const refreshUser = async () => {
    const at = await cookies.get('ft-at');
    const rt = await cookies.get('ft-rt');
    if (at && rt) {
      initializeUser(at);
    } else {
      cookies.remove('ft-at');
      cookies.remove('ft-rt');
    }
  };

  return { user, initializeUser, refreshUser, logout };
};

export default useAuth;
