import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { ReactComponent as CloseIcon } from "../../assets/svg/close.svg";
import WalletField from "../WalletField";

import { WALLETS, WALLET_IDS } from "../../utils";
import useStore, {
  connectedToSelector,
  principalSelector,
  activeConnectionSelector,
  setConnectedToSelector,
  setPrincipalSelector,
  setUnlockedSelector,
  setActiveConnectionSelector,
  setAccountSelector,
} from "../../store";
import {
  useUserWalletDispatch,
  useUserWalletState,
} from "../../contexts/UserWallet";
import { walletType } from "../../types";
import TermsAgreeField from "./TermsAgreeField";
import { ConnectWalletContext } from "../../contexts/ConnectWallet";
import { Principal } from "@dfinity/principal";

interface Step1Type {
  connectedTo: string | null;
  currentWalletId: string | null;
  onWalletConnect: (
    e: React.ChangeEvent<HTMLInputElement>,
    wallet: walletType
  ) => void;
}

interface connectionDataToStoreTypes {
  principal: string | Principal;
  accountID?: string | null;
  wallet: walletType;
}

const RenderStep1 = ({
  connectedTo,
  currentWalletId,
  onWalletConnect,
}: Step1Type) => {
  return (
    <>
      <div className="w-full box-border">
        {WALLETS.map((wallet) => (
          <WalletField
            isActive={connectedTo === wallet.id}
            currentWalletId={currentWalletId}
            wallet={wallet}
            key={wallet.id}
            onClick={onWalletConnect}
          />
        ))}
      </div>
      <a
        href="https://www.blog.infinityswap.one/getting-started-with-infinityswap-wallet-a-step-by-step-guide/"
        target="_blank"
        className="block text-center"
        rel="noreferrer"
      >
        <span className="cursor-pointer body-secondary-semibold text-primary-800">
          Learn how to connect your wallet
        </span>
      </a>
    </>
  );
};

export default function ConnectWallet() {
  const { forced, toggleConnectModal } = useContext(ConnectWalletContext);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentWalletId, setCurrentWalletId] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [step, setStep] = useState<number>(1);
  const userWallet = useUserWalletState();
  const { setWallet } = useUserWalletDispatch();
  const principalId = useStore(principalSelector);
  const connectedTo = useStore(connectedToSelector);
  const setPrincipal = useStore(setPrincipalSelector);
  const setAccountID = useStore(setAccountSelector);
  const setUnlocked = useStore(setUnlockedSelector);
  const setConnectedTo = useStore(setConnectedToSelector);
  const setActiveConnection = useStore(setActiveConnectionSelector);
  const activeConnection = useStore(activeConnectionSelector);
  const [termAccepted, setTermAccepted] = useState(!!principalId);

  const connectionPayload = {
    host: process.env.REACT_APP_IC_HOST,
    //whitelist: [canisterIds.tokenFactory],
  };

  const setConnectionDataToStore = ({
    principal,
    accountID = null,
    wallet,
  }: connectionDataToStoreTypes) => {
    setPrincipal(principal);
    setAccountID(accountID);
    setActiveConnection(wallet.id, principal, false);
    setUnlocked(true);
    setConnectedTo(wallet.id);
    toggleConnectModal("");
  };

  const shouldRetryConnection = async (wallet: walletType) => {
    try {
      const selectedPrincipal =
        activeConnection && wallet && activeConnection[wallet.id];
      if (selectedPrincipal) {
        const walletInstance = (window as any).ic[wallet.exposedName];
        const principal = await walletInstance.getPrincipal();
        if (principal.toText() !== selectedPrincipal) {
          return true;
        }
        const connected = await walletInstance.isConnected();
        if (connected) {
          setConnectionDataToStore({ principal: principal.toText(), wallet });
          return false;
        }
      }
    } catch (error) {}
    return true;
  };

  const handlePlugConnection = async (wallet: walletType) => {
    if ((window as any)?.ic?.plug) {
      const plug = (window as any).ic[wallet.exposedName];
      (async () => {
        setLoading(true);
        setCurrentWalletId(wallet.id);
        const shouldRetry = await shouldRetryConnection(wallet);
        if (!shouldRetry) {
          return;
        }
        try {
          const result = await plug.requestConnect(connectionPayload);
          const connectionState = result ? "allowed" : "denied";
          if (connectionState) {
            const principal = await plug.getPrincipal();
            const principalIdText = principal.toText();
            setConnectionDataToStore({
              principal: principalIdText,
              wallet,
            });
          } else {
            // notify, rejected request

            setUnlocked(false);
          }
        } catch (error) {
          // notify, error message
          // notification.error({ description: error.message });
          setUnlocked(false);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      window.open(wallet.installation);
    }
  };

  const handleInfinityConnection = async (wallet: walletType) => {
    if ((window as any)?.ic?.infinityWallet) {
      const infinityWallet = (window as any).ic[wallet.exposedName];
      setLoading(true);
      setCurrentWalletId(wallet.id);
      const shouldRetry = await shouldRetryConnection(wallet);

      if (!shouldRetry) {
        setLoading(false);
        return;
      }

      try {
        const result = await infinityWallet.requestConnect(connectionPayload);
        const connectionState = result ? "allowed" : "denied";

        if (connectionState) {
          const principal = await (
            window as any
          ).ic.infinityWallet.getPrincipal();
          const accountID = await (
            window as any
          ).ic.infinityWallet.getAccountID();

          const principalIdText = principal.toText();

          setConnectionDataToStore({
            principal: principalIdText,
            accountID,
            wallet,
          });
        } else {
          // request rejected
          setUnlocked(false);
        }
      } catch (error) {
        console.log("error", error);
        setUnlocked(false);
      } finally {
        setLoading(false);
      }
    } else {
      window.open(wallet.installation);
    }
  };

  const onWalletConnect = (
    e: React.ChangeEvent<HTMLInputElement>,
    wallet: walletType
  ) => {
    if (!termAccepted) {
      setShowWarning(true);
      return;
    }
    setStep(2);
    e.preventDefault();
    switch (wallet.id) {
      case WALLET_IDS.PLUG:
        handlePlugConnection(wallet);
        break;
      case WALLET_IDS.INFINITY_WALLET:
        handleInfinityConnection(wallet);
        break;
      default:
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} zIndex={20}>
      <div className="w-full md:w-[324px] p-5">
        <div className={`w-full flex justify-between items-center`}>
          <div className={"h6-semibold text-black"}>Select Wallet</div>
          <div>
            <div
              className="hidden sm:block"
              onClick={() => setShowModal(false)}
            >
              <CloseIcon className="w-6 h-6" stroke="var(--secondary-black)" />
            </div>
          </div>
        </div>
        <TermsAgreeField
          step={step}
          termAccepted={termAccepted}
          setTermAccepted={setTermAccepted}
          showWarning={showWarning}
          setShowWarning={setShowWarning}
        />
        {step === 1 && (
          <RenderStep1
            connectedTo={connectedTo}
            currentWalletId={currentWalletId}
            onWalletConnect={onWalletConnect}
          />
        )}
      </div>
    </Modal>
  );
}
