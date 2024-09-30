import { initialScannerState, scannerActions, ScannerState } from '../types';

// eslint-disable-next-line default-param-last
const scannerReducer = (
  action: any,
  state: ScannerState = initialScannerState,
) => {
  switch (action.type) {
    case scannerActions.SET_ONLINE:
      return {
        ...state,
        online: action.payload,
      };
    case scannerActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case scannerActions.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default scannerReducer;
