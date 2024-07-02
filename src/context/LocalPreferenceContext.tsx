import {
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  useReducer,
} from "react";
import { initialLocalPreferenceState, LocalPreferenceState } from "./types";
import { localPreferenceReducer } from "./reducers/localPreferenceReducer";

type LocalPreferenceContextType = {
  state: LocalPreferenceState;
  dispatch: Dispatch<any>;
};

const LocalPreferenceContext = createContext<LocalPreferenceContextType>({
  state: initialLocalPreferenceState,
  dispatch: () => {},
});

export const useLocalPreferenceState = () => {
  return useContext(LocalPreferenceContext);
};

export const LocalPreferenceContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    localPreferenceReducer,
    initialLocalPreferenceState,
  );

  return (
    <LocalPreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </LocalPreferenceContext.Provider>
  );
};
