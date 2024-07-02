import {
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  useReducer,
  useMemo,
} from 'react';
import { initialUserState, UserState } from './types';
import userReducer from './reducers/userReducer';

type UserContextType = {
  state: UserState;
  dispatch: Dispatch<any>;
};

const UserContext = createContext<UserContextType>({
  state: initialUserState,
  dispatch: () => {},
});

export const useUserState = () => {
  return useContext(UserContext);
};

export function UserContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
