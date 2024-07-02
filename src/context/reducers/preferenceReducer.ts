import { initialPreferenceState, preferenceActions } from "../types";

export const preferenceReducer = (
  state = initialPreferenceState,
  action: any,
) => {
  switch (action.type) {
    case preferenceActions.SET_PREFERENCE:
      return {
        ...state,
        awardsVisibilityPrivate: action.payload.awardsVisibilityPrivate,
        allowProfanity: action.payload.allowProfanity,
        betaAccess: action.payload.betaAccess,
        allowPoliticalContent: action.payload.allowPoliticalContent,
        hidePostsOnProfile: action.payload.hidePostsOnProfile,
        hideProfileHistory: action.payload.hideProfileHistory,
        allowNSFWContent: action.payload.allowNSFWContent,
      };
    default:
      return state;
  }
};
