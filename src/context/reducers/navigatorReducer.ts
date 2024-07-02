import { initialNavigatorState, navigatorActions } from "../types";

export const navigatorReducer = (
  state = initialNavigatorState,
  action: any,
) => {
  switch (action.type) {
    case navigatorActions.SET_BACK_PATH:
      return { ...state, backPath: action.payload };
    case navigatorActions.SET_LOGO_CLICKED:
      return { ...state, logoClicked: action.payload };
    default:
      return state;
  }
};
