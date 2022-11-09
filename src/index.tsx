import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConnectWalletProvider } from "./contexts/ConnectWallet";
import { InstallPromptProvider } from "./contexts/InstallPrompt";
import { UserWalletProvider } from "./contexts/UserWallet";
import { ThemeProvider } from "./contexts/themeContext";
import { getRejectErrorCode } from "./utils/canisterErrorHandler";
import { SwapProps, WidgetProps } from "./types";
import SwapWidgetComponent from "./components/widgets/SwapWidgetComponent";
import "./assets/style.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: (failureCount, error) => {
        const icError = getRejectErrorCode(error);

        if (icError && !icError.retry) {
          if (icError.notify) {
            //errorNotify(icError.message);
          }

          return false;
        }

        return failureCount < 5;
      },
    },
  },
});

export const SwapWidget = (props: WidgetProps & SwapProps) => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserWalletProvider>
          <ConnectWalletProvider>
            <InstallPromptProvider>
              <ThemeProvider>
                <SwapWidgetComponent {...props} />
              </ThemeProvider>
            </InstallPromptProvider>
          </ConnectWalletProvider>
        </UserWalletProvider>
      </QueryClientProvider>
    </div>
  );
};
