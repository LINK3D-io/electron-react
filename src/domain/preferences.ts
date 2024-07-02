// If you edit this MAKE SURE to update updatePreferences in server
export type Preferences = {
  awardsVisibilityPrivate: boolean;
  allowProfanity: boolean;
  betaAccess: boolean;
  allowPoliticalContent: boolean;
  allowNSFWContent: boolean;
  hidePostsOnProfile: boolean;
  hideProfileHistory: boolean;
};

export enum PreferencesEnum {
  awardsVisibilityPrivate = 'awardsVisibilityPrivate',
  allowProfanity = 'allowProfanity',
  betaAccess = 'betaAccess',
  allowPoliticalContent = 'allowPoliticalContent',
  hidePostsOnProfile = 'hidePostsOnProfile',
  hideProfileHistory = 'hideProfileHistory',
  allowNSFWContent = 'allowNSFWContent',
}
