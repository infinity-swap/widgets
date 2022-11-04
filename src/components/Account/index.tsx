import React, { useContext } from "react";
import { ConnectWalletContext } from "../../contexts/ConnectWallet";
import useStore, {
  connectedToSelector,
  principalSelector,
  setPrincipalSelector,
  setConnectedToSelector,
  setActiveConnectionSelector,
  setAccountSelector,
} from "../../store";
import { WALLET_IDS } from "../../utils";
import Modal from "../Modal";

export const getWallet = (id: string | null) => {
  let wallet = "";
  switch (id) {
    case WALLET_IDS.PLUG:
      wallet = "Plug";
      break;
    case WALLET_IDS.INFINITY_WALLET:
      wallet = "Infinity Wallet";
      break;
    default:
      wallet = "Unknown";
  }

  return wallet;
};

export default function Account() {
  const { forced, toggleConnectModal, showModalType, setWalletStep } =
    useContext(ConnectWalletContext);
  const connectedTo = useStore(connectedToSelector);
  const principalId = useStore(principalSelector);
  const setConnectedTo = useStore(setConnectedToSelector);
  const setAccountId = useStore(setAccountSelector);
  const setActiveConnection = useStore(setActiveConnectionSelector);
  const setPrincipal = useStore(setPrincipalSelector);

  const disconnect = () => {
    try {
      setConnectedTo("");
      setPrincipal("");
      setActiveConnection("", null, true);
      setAccountId("");
      toggleConnectModal("");
      setWalletStep(1);
      if ((window as any)?.ic?.infinityWallet) {
        (window as any)?.ic?.infinityWallet?.disconnect();
      }
    } catch (err) {
      console.log("Failed to disconnect wallet:", err);
    }
  };

  return (
    <>
      <Modal
        isOpen={showModalType === "account"}
        onClose={() => toggleConnectModal("")}
        zIndex={20}
      >
        <div className="w-full md:w-[324px] p-5">
          <Modal.Header
            title="Account"
            onClose={() => toggleConnectModal("")}
          />
          <div className="flex justify-between mt-2">
            <span className="body-secondary-semibold text-secondary-800">
              Connected with {getWallet(connectedTo)}
            </span>
            <span
              className="cursor-pointer text-primary-900 body-secondary font-bold uppercase ml-6"
              onClick={() => toggleConnectModal("connectWallet")}
            >
              Change
            </span>
          </div>
          <div>
            <div className="mt-5 h6-semibold">Principal</div>
            <div className="bg-secondary-200 flex items-center rounded-md h-[52px] mt-2">
              <div className="w-3/4 overflow-hidden px-4 ">
                <div className=" whitespace-nowrap truncate">{principalId}</div>
              </div>
            </div>
            <div
              className="flex justify-end cursor-pointer text-primary-800 body-secondary font-bold uppercase mt-2"
              onClick={() => disconnect()}
              data-testid="disconnect-wallet"
            >
              Disconnect
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
