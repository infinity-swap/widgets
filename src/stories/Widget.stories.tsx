window.global ||= window;

import React from "react";
import { SwapWidget } from "../index";
export default {
  title: "Widget",
};

const onConnectWallet = () => {
  console.log("connect to wallet");
};
var theme = { textDark: "blue" };

const changeTheme = () => {
  theme = { textDark: "red" };
};

export const Widget = () => (
  <div>
    <SwapWidget
      theme={theme}
      // onConnectWallet={() => onConnectWallet()}
      //accountId = {accountId}
      // principalId = principalId=""
      icNetwork={{
        icHost: "http://localhost:8000",
        icEnviron: "local",
        MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        CANISTER_IDS_URL: "http://localhost:8001/static/canister_ids.json",
      }}
      defaultInputAmount="1"
      defaultOutputTokenSymbol="TKN1"
      defaultInputTokenSymbol="T-ICP"
      onSuccess={() => console.log("it a successful swap")}
      onError={() => console.log("oh no there was an error")}
    />
  </div>
);
