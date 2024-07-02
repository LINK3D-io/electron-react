import { createContext, PropsWithChildren, useCallback, useState } from "react";

const AuthWidgetContext = createContext({
  loginModalOpen: false,
  signupModalOpen: false,
  authContinueModalOpen: false,
  logoutModalOpen: false,
  setAuthContinueModalOpen: (bool: boolean) => {},
  setLogoutModalOpen: (bool: boolean) => {},
  setLoginModalOpen: (bool: boolean) => {},
  setSignupModalOpen: (bool: boolean) => {},
  openAuthContinueModal: () => {},
  openLogoutModal: () => {},
  openLoginModal: () => {},
  openSignupModal: () => {},
});

export const AuthWidgetContextProvider = ({ children }: PropsWithChildren) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [authContinueModalOpen, setAuthContinueModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const contextValue = {
    loginModalOpen,
    signupModalOpen,
    authContinueModalOpen,
    logoutModalOpen,
    setAuthContinueModalOpen: useCallback(setAuthContinueModalOpen, []),
    setLogoutModalOpen: useCallback(setLogoutModalOpen, []),
    setLoginModalOpen: useCallback(setLoginModalOpen, []),
    setSignupModalOpen: useCallback(setSignupModalOpen, []),
    openAuthContinueModal: useCallback(
      () => setAuthContinueModalOpen(true),
      [],
    ),
    openLogoutModal: useCallback(() => setLogoutModalOpen(true), []),
    openLoginModal: useCallback(() => setLoginModalOpen(true), []),
    openSignupModal: useCallback(() => setSignupModalOpen(true), []),
  };

  return (
    <AuthWidgetContext.Provider value={contextValue}>
      {children}
    </AuthWidgetContext.Provider>
  );
};

export default AuthWidgetContext;
