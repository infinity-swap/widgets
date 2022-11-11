window.global ||= window;
import * as React from "react";
import { useLadleContext, ActionType, ThemeState } from "@ladle/react";
import { SwapWidget } from "..";

export const StoryChangingTheTheme = () => {
  const { globalState, dispatch } = useLadleContext();
  const [theme, setTheme] = React.useState({ textDark: "blue" });

  const darkTheme = {
    primary: "rgba(32, 122, 249, 1)",
    error: "rgb(255 42 87)",
    inputContainer: "#4E4E5A",
    inputBorder: "rgba(138, 154, 185, 0.1)",
    container: "#222633",
    dialog: "#222633",
    textDark: "#fff",
    textWhite: "rgb(255 42 87)",
    textGrey: "#868c99",
    disabled: "rgba(232, 235, 241, 1)",
    interactive: "#4E4E5A",
    interactiveBorder: "rgba(138, 154, 185, 0.2)",
    interactiveBorderRadius: "9999px",
    width: "360px",
  };
  const changeTheme = (payload) => {
    setTheme(payload);
  };
  const onConnectWallet = () => {
    alert("I will handle my own wallet connection ");
  };
  return (
    <>
      <p>Active theme: </p>
      <button
        onClick={() => changeTheme({ textDark: "red", container: "black" })}
      >
        change Theme 1
      </button>
      <button onClick={() => changeTheme(darkTheme)}>dark Theme</button>
      <SwapWidget
        theme={theme}
        // onConnectWallet={() => onConnectWallet()}
        //accountId = {accountId}
        // principalId = principalId=""
        /* icNetwork={{
        icHost: "http://localhost:8000",
        icEnviron: "local",
        MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        CANISTER_IDS_URL: "http://localhost:8001/static/canister_ids.json",
      }} */
        //defaultInputAmount="1"
        //defaultOutputTokenSymbol="TKN1"
        //defaultInputTokenSymbol="T-ICP"
        //onSuccess={(e) => onSuccess(e)}
        // onError={() => console.log("oh no there was an error")}
      />
    </>
  );
};

/* import * as React from "react";
import { useLadleContext, ActionType, ThemeState } from "@ladle/react";
import { SwapWidget } from "../index";


var theme = { textDark: "blue" };

const changeTheme = () => {
  theme = { textDark: "red" };
};

const onSuccess = (e) => {
  console.log(e);
  alert(e?.message);
};

export const widget = () => {
  const { globalState, dispatch } = useLadleContext();
  // const [test, setTest] = React.useState("tsing")
  return (
    <>
      <p>Active theme: {globalState.theme}</p>
      <button
        onClick={() =>
          dispatch({
            type: ActionType.UpdateTheme,
            value:
              globalState.theme === ThemeState.Dark
                ? ThemeState.Light
                : ThemeState.Dark,
          })
        }
      >
        Switch theme
      </button>
     {/*  <SwapWidget
        theme={theme}
        // onConnectWallet={() => onConnectWallet()}
        //accountId = {accountId}
        // principalId = principalId=""
        /* icNetwork={{
        icHost: "http://localhost:8000",
        icEnviron: "local",
        MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        CANISTER_IDS_URL: "http://localhost:8001/static/canister_ids.json",
      }} 
        //defaultInputAmount="1"
        //defaultOutputTokenSymbol="TKN1"
        //defaultInputTokenSymbol="T-ICP"
        //onSuccess={(e) => onSuccess(e)}
        // onError={() => console.log("oh no there was an error")}
      /> 
    </>
  );
};
 */
