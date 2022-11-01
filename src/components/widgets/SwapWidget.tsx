import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../Header";
import Input from "../Input";
import useStore, { slippageSelector } from "../../store";
import Modal from "../Modal";
import Button from "../Button";
import { ConnectWalletContext } from "../../contexts/ConnectWallet";
import ConnectWallet from "../ConnectWallet";

export default function SwapWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const storedSlippage = useStore(slippageSelector);
  const walletContext = useContext(ConnectWalletContext);

  return (
    <>
      <ConnectWallet />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4 w-full md:w-[360px]">
          {/* Header */}
          <div>
            <Header slippage={0.1} onOpenSettings={() => {}} />
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
