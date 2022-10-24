import clsx from "clsx";
import React, { ReactNode } from "react";
import { ReactComponent as RectangleIcon } from "../assets/svg/primary-online-rectangle.svg";
import { walletType } from "../types";

interface WalletFieldWrapperType {
  children: ReactNode;
  isActive: boolean;
  disabled: boolean;
  name: string;
}

interface WalletFieldType extends WalletFieldWrapperType {
  Icon: any;
  className: string;
  name: string;
  currentWalletId: string | null;
  [rest: string]: any;
  onClick: (e: React.ChangeEvent<HTMLInputElement>, wallet: walletType) => void;
}

export const WalletIconWrapper = () => {
  return <div></div>;
};

export const WalletFieldWrapper = ({
  children,
  isActive,
  disabled,
  name,
}: WalletFieldWrapperType) => {
  const className = clsx(
    isActive ? "bg-secondary-500 justify-between" : "bg-secondary-100",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    "flex w-full h-auto p-[5%] my-2 mx-0 text-sm"
  );
  return (
    <div id={`connect${name}`} className={className}>
      {children}
    </div>
  );
};

export default function WalletField({
  className,
  Icon,
  name,
  onClick,
  currentWalletId,
  isActive,
  disabled,
  ...rest
}: WalletFieldType) {
  return (
    <WalletFieldWrapper isActive={isActive} disabled={disabled} name={name}>
      <div className="flex items-center">
        {currentWalletId === rest?.id ? (
          <div>loading...</div>
        ) : (
          <div>
            <Icon alt="" />
          </div>
        )}
        <span className="body-primary-semibold">{name}</span>
      </div>
      {isActive && <RectangleIcon />}
    </WalletFieldWrapper>
  );
}
