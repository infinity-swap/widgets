import React from "react";
import { useState, createContext, ReactNode } from "react";
import { Theme } from "../../types";

export const ThemeContext = createContext<any>({} as any);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeVariables, setThemeVariables] = useState<Theme | null>();

  const setCSSVariables = (theme: Theme) => {
    if (!!theme) {
      const keys = Object.keys(theme);
      const SwapWidgetTheme =
        document.querySelector<HTMLElement>(".swap-widget");
      keys.forEach((key: string) => {
        SwapWidgetTheme?.style?.setProperty(
          `--${key}`,
          theme[key as keyof Theme]!
        );
      });
      setThemeVariables(theme);
    }
  };
  //setCSSVariables(theme)
  return (
    <ThemeContext.Provider value={{ themeVariables, setCSSVariables }}>
      {children}
    </ThemeContext.Provider>
  );
};
