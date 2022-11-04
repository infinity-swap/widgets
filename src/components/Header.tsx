import React from "react";
import { ReactComponent as SettingIcon } from "../assets/svg/Setting.svg";
import { ReactComponent as RectangleIcon } from "../assets/svg/primary-online-rectangle.svg";
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
        <div className="text-[var(--textDark)]">{label || "Swap"}</div>
        <div className="flex items-center space-x-2">
          <div
            onClick={() => showWalletHandler()}
            className="body-secondary bg-secondary-100 py-1 px-2 rounded-md text-[var(--textDark)] cursor-pointer"
          >
            {principalId ? (
              <div className="w-24 flex items-center space-x-1 truncate">
                {" "}
                <span>
                  <RectangleIcon />
                </span>
                <span>{principalId}</span>
              </div>
            ) : (
              " Connect your wallet"
            )}
          </div>
          <div>
            <SettingIcon
              onClick={onOpenSettings}
              className="cursor-pointer fill-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
