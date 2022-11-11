import clsx from "clsx";
import React, { ReactNode } from "react";
import { RectangleIcon } from "../assets/svg/Icons";
import { walletType } from "../types";
import Loader from "./Loader";

interface WalletFieldWrapperType {
  children?: ReactNode;
  isActive?: boolean;
  disabled?: boolean | undefined;
  name?: string;
}

interface WalletFieldType extends WalletFieldWrapperType {
  key?: string;
  className?: string;
  currentWalletId: string | null;
  wallet: walletType;
  [rest: string]: any;
  onClick: (wallet: walletType) => void;
}

export const WalletFieldWrapper = ({
  children,
  isActive,
  disabled,
  name,
}: WalletFieldWrapperType) => {
  const className = clsx(
    isActive ? "bg-secondary-500 justify-between" : "bg-secondary-100",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    "flex items-center w-full h-auto p-[5%] my-2 mx-0 text-sm rounded-[8px]"
  );
  return (
    <div id={`connect${name}`} className={className}>
      {children}
    </div>
  );
};

export default function WalletField({
  className,
  wallet,
  onClick,
  currentWalletId,
  isActive,
}: WalletFieldType) {
  return (
    <div
      onClick={(e) => {
        if (wallet?.disabled) {
          return;
        }
        if (isActive) {
          return;
        }
        onClick(wallet);
      }}
    >
      <WalletFieldWrapper
        isActive={isActive}
        disabled={wallet?.disabled}
        name={wallet?.name}
      >
        <div className="flex items-center">
          {currentWalletId === wallet?.id ? (
            <div className="pr-1">
              <Loader />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-full dark:bg-transparent mr-2 bg-white w-[32px] h-[32px] shadow-lg">
              <wallet.Icon alt="" className="w-2/3 h-2/3" />
            </div>
          )}
          <span className="body-primary-semibold text-[var(--textDark)]">
            {wallet?.name}
          </span>
        </div>
        {isActive && <RectangleIcon />}
      </WalletFieldWrapper>
    </div>
  );
}
