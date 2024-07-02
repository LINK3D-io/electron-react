import {
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  useReducer,
} from "react";
import { initialNavigatorState, NavigatorState } from "./types";
import { navigatorReducer } from "./reducers/navigatorReducer";

type NavigatorContextType = {
  state: NavigatorState;
  dispatch: Dispatch<any>;
};

const NavigatorContext = createContext<NavigatorContextType>({
  state: initialNavigatorState,
  dispatch: () => {},
});

export const useNavigatorState = () => {
  return useContext(NavigatorContext);
};

export const NavigatorContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(navigatorReducer, initialNavigatorState);

  return (
    <NavigatorContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigatorContext.Provider>
  );
};
