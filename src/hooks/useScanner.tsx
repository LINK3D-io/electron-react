import { useScannerContext } from '../context/scannerContext';
import { scannerActions } from '../context/types';

const useScanner = () => {
  const { state, dispatch } = useScannerContext();

  const setOnline = (online: boolean) => {
    console.log('Setting online to', online);
    dispatch({
      type: scannerActions.SET_ONLINE,
      payload: online,
    });
  };

  const setError = (error: boolean) => {
    dispatch({ type: scannerActions.SET_ERROR, payload: error });
  };

  return {
    scannerState: state,
    setOnline,
    setError,
  };
};

export default useScanner;
