import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../Header";
import Input from "../Input";
import useStore, { slippageSelector } from "../../store";
import Modal from "../Modal";
import Button from "../Button";

export default function SwapWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const storedSlippage = useStore(slippageSelector);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
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
  );
}
