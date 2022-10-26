import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../Header";
import Input from "../Input";
import useStore, { principalSelector, slippageSelector } from "../../store";
import Modal from "../Modal";
import Button from "../Button";
import { ConnectWalletContext } from "../../contexts/ConnectWallet";
import ConnectWallet from "../ConnectWallet";
import Account from "../Account";

export default function SwapWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const { forced, toggleConnectModal, showModalType } =
    useContext(ConnectWalletContext);
  const storedSlippage = useStore(slippageSelector);
  const principalId = useStore(principalSelector);
  const walletContext = useContext(ConnectWalletContext);

  const showWalletHandler = () => {
    if (!principalId) {
      toggleConnectModal("connectWallet");
    }
    if (principalId) {
      toggleConnectModal("account");
    }
  };

  return (
    <>
      <ConnectWallet />
      <Account />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4 w-full md:w-[360px]">
          {/* Header */}
          <div>
            <Header
              showWalletHandler={showWalletHandler}
              slippage={0.1}
              onOpenSettings={() => {}}
            />
          </div>
          <div>
            <div className="mt-6 relative">
              <Input
                name="icp"
                testId="swap-input-from"
                onInputClick={() => {}}
                onChange={() => {}}
                value={1}
              />
            </div>
            <div className="mt-6 relative">
              <Input
                name="aave"
                testId="swap-input-from"
                onInputClick={() => {}}
                onChange={() => {}}
                value={1}
              />
            </div>
            <Button className="w-full">Connect Wallet</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
