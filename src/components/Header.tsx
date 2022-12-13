import React from "react";
import { SettingsIcon, RectangleIcon, WalletIcon } from "../assets/svg/Icons";
import useStore, { principalSelector } from "../store";

interface HeaderProps {
  label?: string;
  slippage?: string | number;
  onOpenSettings?: () => void;
  showWalletHandler: () => void;
}

export default function Header({
  label,
  onOpenSettings,
  slippage,
  showWalletHandler,
}: HeaderProps) {
  const principalId = useStore(principalSelector);

  return (
    <div className="swap-modal-header">
      <div className="flex justify-between items-center">
        <div className="text-[var(--textPrimary)] font-bold">
          {label || "Swap"}
        </div>
        <div className="flex items-center space-x-2">
          <div
            onClick={() => showWalletHandler()}
            className="body-secondary bg-secondary-100 py-1 px-2 rounded-md text-[var(--textPrimary)] cursor-pointer"
          >
            {principalId ? (
              <div className="w-24 flex items-center space-x-1 truncate">
                {" "}
                <span>
                  <RectangleIcon />{" "}
                </span>
                <span>{principalId}</span>
              </div>
            ) : (
              <div className="flex space-x-1 items-center">
                <div>
                  <WalletIcon className="cursor-pointer fill-[var(--textSecondary)]" />
                </div>
                <div>Connect your wallet</div>
              </div>
            )}
          </div>
          <div>
            <SettingsIcon
              onClick={onOpenSettings}
              className="cursor-pointer fill-[var(--textSecondary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
