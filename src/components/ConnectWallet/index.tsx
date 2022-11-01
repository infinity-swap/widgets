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
import Loader from "../Loader";
import { WALLET_GUIDE_URL } from "../../shared/constants";

interface Step1Type {
  connectedTo: string | null;
  currentWalletId: string | null;
  onWalletConnect: (wallet: walletType) => void;
}

interface Step2Type extends Step1Type {
  loading: boolean;
  wallet?: walletType;
}

interface connectionDataToStoreTypes {
  principal: string | Principal;
  accountID: string | null;
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
        href={WALLET_GUIDE_URL}
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

const RenderStep2 = ({
  loading,
  onWalletConnect,
  currentWalletId,
  wallet,
}: Step2Type) => {
  return (
    <>
      {loading ? (
        <div className="w-full box-border flex items-center my-4 p-2 rounded-md bg-secondary-100 space-x-2">
          <Loader />
          <span className="body-secondary text-secondary-black">
            Initializing...
          </span>
        </div>
      ) : (
        <div className="w-full box-border flex items-center my-4 p-2 rounded-[8px] bg-secondary-100 border border-red-500">
          <span className="body-secondary mr-4 text-red-500">
            Error connecting
          </span>
          <span
            className="body-secondary text-secondary-black bg-secondary-200 rounded-[8px] p-2 cursor-pointer"
            onClick={(e) => onWalletConnect(wallet!)}
          >
            Try Again
          </span>
        </div>
      )}
      <div className="flex my-4 p-2 rounded-[8px] bg-secondary-100 items-center">
        <div className="flex items-center justify-center rounded-full dark:bg-transparent mr-2 bg-white w-[32px] h-[32px] shadow-lg">
          {wallet?.Icon && <wallet.Icon alt="" className="w-2/3 h-2/3" />}
        </div>
        <div className="flex flex-col">
          <span className="h6-semibold text-black uppercase">
            {wallet?.name}
          </span>
          <span className="body-secondary text-secondary-800">
            Easy to use browser extension
          </span>
        </div>
      </div>
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
          setConnectionDataToStore({
            principal: principal.toText(),
            wallet,
            accountID: "",
          });
          return false;
        }
      }
    } catch (error) {
      console.log("retry error", error);
    }
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
              accountID: "",
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
          console.log("rejected");
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

  const onWalletConnect = (wallet: walletType) => {
    console.log(wallet, "clicked");
    if (!termAccepted) {
      setShowWarning(true);
      return;
    }
    setStep(2);
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

  const selectedWallet: walletType = WALLETS.find(
    (wallet) => wallet.id === currentWalletId
  ) || { id: "", exposedName: "", name: "", installation: "" };

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
        {step === 2 && (
          <RenderStep2
            loading={loading}
            connectedTo={connectedTo}
            currentWalletId={currentWalletId}
            onWalletConnect={onWalletConnect}
            wallet={selectedWallet}
          />
        )}
      </div>
    </Modal>
  );
}
