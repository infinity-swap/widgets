/* eslint-disable no-console */
import React from "react";

let deferredPrompt;

export const InstallPromptContext = React.createContext();

function useInstallPrompt() {
  const [installable, setInstallable] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      // console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = React.useCallback(
    (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        /*  if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        } */
      });
    },
    [setInstallable]
  );

  return [installable, setInstallable, handleInstallClick];
}

export function useInstallPromptState() {
  const context = React.useContext(InstallPromptContext);

  if (context === undefined) {
    throw new Error(
      "useInstallPromptState must be used within a InstallPromptProvider"
    );
  }

  return context;
}

export function InstallPromptProvider({ children }) {
  const [installable, setInstallable, handleInstallClick] = useInstallPrompt();
  const value = React.useMemo(
    () => ({ installable, setInstallable, handleInstallClick }),
    [installable, setInstallable, handleInstallClick]
  );

  return (
    <InstallPromptContext.Provider value={value}>
      {children}
    </InstallPromptContext.Provider>
  );
}
