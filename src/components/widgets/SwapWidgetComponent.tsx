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
import SwapSelectPair from "../SwapSelectPair";
import AppWrapper from "../AppWrapper";

const WhichToken = {
  IN: 1,
  OUT: 2,
};

export default function SwapWidgetComponent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectPair, toggleSelectPair] = useState<boolean>(false);

  const { forced, toggleConnectModal, showModalType } =
    useContext(ConnectWalletContext);
  const storedSlippage = useStore(slippageSelector);
  const principalId = useStore(principalSelector);
  const {
    resetField,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      inToken: undefined,
      outToken: undefined,
      changeToken: WhichToken.IN,
      slippage: storedSlippage,
      inAmount: 0,
      outAmount: 0,
    },
  });

  const onDropDownClick = (val: number) => {
    if (!principalId) {
      return showWalletHandler();
    }

    setValue("changeToken", val);
    toggleSelectPair(true);
  };

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
      <SwapSelectPair
        isOpen={selectPair}
        onChange={() => {}}
        onClose={() => toggleSelectPair((prev) => !prev)}
      />
      <Modal isOpen={isOpen} onClose={() => onClose()}>
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
                onInputClick={() => onDropDownClick(WhichToken.IN)}
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
            <div className="mt-7">
              {!principalId ? (
                <Button onClick={showWalletHandler} className="w-full">
                  Connect Wallet
                </Button>
              ) : (
                <Button className="w-full">Swap</Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
