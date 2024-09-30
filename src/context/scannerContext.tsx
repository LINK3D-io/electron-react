import {
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  useReducer,
  useMemo,
} from 'react';
import { initialScannerState, ScannerState } from './types';
import scannerReducer from './reducers/scannerReducer';

type ScannerContextType = {
  state: ScannerState;
  dispatch: Dispatch<any>;
};

const ScannerContext = createContext<ScannerContextType>({
  state: initialScannerState,
  dispatch: () => {},
});

export const useScannerContext = () => {
  return useContext(ScannerContext);
};

export function ScannerContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(scannerReducer, initialScannerState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ScannerContext.Provider value={contextValue}>
      {children}
    </ScannerContext.Provider>
  );
}
