import { initialLocalPreferenceState, localPreferenceActions } from "../types";

export const localPreferenceReducer = (
  state = initialLocalPreferenceState,
  action: any,
) => {
  switch (action.type) {
    case localPreferenceActions.setPostFilterType:
      return { ...state, postFilterType: action.payload };
    case localPreferenceActions.setPostModeType:
      return { ...state, postModeType: action.payload };
    case localPreferenceActions.setMuteVideo:
      return { ...state, muteVideo: action.payload };
    case localPreferenceActions.setBotFilter:
      return { ...state, filterBot: action.payload };
    case localPreferenceActions.setPostSortBy: {
      return { ...state, postSortBy: action.payload };
    }
    case localPreferenceActions.setDataMode: {
      return { ...state, dataMode: action.payload };
    }
    // case localPreferenceActions.SET_THEME:
    //     return { ...state, theme: action.payload }
    default:
      return state;
  }
};
