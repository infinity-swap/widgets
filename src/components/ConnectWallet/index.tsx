import React, { useState } from "react";
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

interface Step1Type {
  connectedTo: string | null;
  currentWalletId: string | null;
  onWalletConnect: (
    e: React.ChangeEvent<HTMLInputElement>,
    wallet: walletType
  ) => void;
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
  const [showModal, setShowModal] = useState<boolean>(true);
  const [loading, setLoading] = useState(null);
  const [currentWalletId, setCurrentWalletId] = useState(null);
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

  const onWalletConnect = (
    e: React.ChangeEvent<HTMLInputElement>,
    wallet: walletType
  ) => {};

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
