window.global ||= window;
import * as React from "react";
import { useLadleContext, ActionType, ThemeState } from "@ladle/react";
import { SwapWidget } from "..";

export const StoryChangingTheTheme = () => {
  const { globalState, dispatch } = useLadleContext();
  const [theme, setTheme] = React.useState();

  const darkTheme = {
    primary: "rgba(32, 122, 249, 1)",
    error: "rgb(255 42 87)",
    inputContainer: "#4E4E5A",
    inputBorder: "rgba(138, 154, 185, 0.1)",
    container: "#222633",
    dialog: "#222633",
    textPrimary: "#fff",
    textWhite: "rgb(255 42 87)",
    textGrey: "#868c99",
    disabled: "rgba(232, 235, 241, 1)",
    interactive: "#4E4E5A",
    interactiveBorder: "rgba(138, 154, 185, 0.2)",
    interactiveBorderRadius: "9999px",
    width: "560px",
  };

  const changeTheme = (payload) => {
    setTheme(payload);
  };
  const onConnectWallet = () => {
    alert("I will handle my own wallet connection ");
  };

  const onSuccess = (e) => {
    console.log(e);
    alert(e?.message);
  };
  return (
    <>
      <p>Active theme: </p>
      <div>
        <button
          onClick={() =>
            changeTheme({ textPrimary: "red", container: "black" })
          }
        >
          change Theme 1
        </button>
        <button onClick={() => changeTheme(darkTheme)}>dark Theme</button>
      </div>
      <div className="border">
        <SwapWidget
          theme={theme}
          icNetwork={{
            icHost: "http://35.189.119.170:8001",
            icEnviron: "local",
            MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
            CANISTER_IDS_URL:
              "http://35.189.119.170:8001/static/canister_ids.json",
          }}
          defaultInputAmount="1"
          defaultOutputTokenSymbol="TKN1"
          defaultInputTokenSymbol="T-ICP"
          onSuccess={(e) => onSuccess(e)}
          onError={() => console.log("oh no there was an error")}
        />
      </div>
    </>
  );
};
