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
import useCanisterIds from "../../hooks/useCanisterIds";
import { IC_HOST } from "../../shared/constants";
import Overlay from "../Overlay";

interface Step1Type {
  connectedTo: string | null;
  currentWalletId: string | null;
  onWalletConnect: (wallet: walletType) => void;
}

interface Step2Type extends Step1Type {
  loading: boolean;
  wallet?: walletType;
  error?: boolean;
}

interface connectionDataToStoreTypes {
  principal: string | null;
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
      <div>
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
        <div className="pt-8">
          <div>
            <a
              href="https://www.blog.infinityswap.one/getting-started-with-infinityswap-wallet-a-step-by-step-guide/"
              target="_blank"
              className="block text-center"
              rel="noreferrer"
            >
              <span className="cursor-pointer body-secondary-semibold text-[var(--primary)]">
                Learn how to connect your wallet
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const RenderStep2 = ({
  loading,
  onWalletConnect,
  currentWalletId,
  wallet,
  error,
}: Step2Type) => {
  return (
    <>
      {loading && (
        <div className="w-full box-border flex items-center my-4 p-2 rounded-md bg-[var(--module)] space-x-2">
          <Loader />
          <span className="body-secondary text-[var(--textPrimary)]">
            Initializing...
          </span>
        </div>
      )}
      {error && (
        <div className="w-full box-border flex items-center my-4 p-2 rounded-[8px] bg-[var(--module)] border border-red-500">
          <span className="body-secondary mr-4 text-[var(--error)]">
            Error connecting
          </span>
          <span
            className="body-secondary text-[var(--textPrimary)] bg-secondary-200 rounded-[8px] p-2 cursor-pointer"
            onClick={(e) => onWalletConnect(wallet!)}
          >
            Try Again
          </span>
        </div>
      )}
      <div className="flex my-4 p-2 rounded-[8px] bg-[var(--module)] items-center">
        <div className="flex items-center justify-center rounded-full dark:bg-transparent mr-2 bg-white w-[32px] h-[32px] shadow-lg">
          {wallet?.Icon && <wallet.Icon alt="" className="w-2/3 h-2/3" />}
        </div>
        <div className="flex flex-col">
          <span className="h6-semibold text-[var(--textPrimary)] uppercase">
            {wallet?.name}
          </span>
          <span className="body-secondary  text-[var(--textPrimary)]">
            Easy to use browser extension
          </span>
        </div>
      </div>
    </>
  );
};

export default function ConnectWallet() {
  const [showError, setShowError] = useState(false);
  const {
    forced,
    toggleConnectModal,
    showModalType,
    walletStep,
    setWalletStep,
  } = useContext(ConnectWalletContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentWalletId, setCurrentWalletId] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
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
  const canisterIds = useCanisterIds();

  const connectionPayload = {
    host: IC_HOST,
    whitelist: [canisterIds.tokenFactory],
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
    setWalletStep(2);
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
  ) || { id: "", exposedName: "", name: "", Icon: "", installation: "" };

  const onClose = () => {
    setWalletStep(1);
    setLoading(false);
    toggleConnectModal("");
    setCurrentWalletId(null);
  };

  return (
    <Overlay isOpen={showModalType === "connectWallet"}>
      <div className="w-full md:w-[324px]">
        <Overlay.Header title="Select Wallet" onClose={() => onClose()} />
        <div className="pt-4">
          <TermsAgreeField
            step={walletStep}
            termAccepted={termAccepted}
            setTermAccepted={setTermAccepted}
            showWarning={showWarning}
            setShowWarning={setShowWarning}
          />
          {walletStep === 1 && (
            <RenderStep1
              connectedTo={connectedTo}
              currentWalletId={currentWalletId}
              onWalletConnect={onWalletConnect}
            />
          )}
          {walletStep === 2 && (
            <RenderStep2
              loading={loading}
              connectedTo={connectedTo}
              currentWalletId={currentWalletId}
              onWalletConnect={onWalletConnect}
              wallet={selectedWallet}
              error={showError}
            />
          )}
        </div>
      </div>
    </Overlay>
  );
}
