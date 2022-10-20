import React from "react";
import { ReactComponent as SettingIcon } from "../assets/svg/Setting.svg";

interface HeaderProps {
  label?: string;
  slippage: string | number;
  onOpenSettings: () => void;
}

export default function Header({
  label,
  onOpenSettings,
  slippage,
}: HeaderProps) {
  return (
    <div className="swap-modal-header">
      <div className="flex justify-between items-center">
        <div>{label || "Swap"}</div>
        <div className="flex items-center space-x-2">
          {slippage && (
            <div className="body-secondary bg-secondary-100 py-1 px-2 rounded-md dark:text-white-600">
              Slippage Tolerance:{" "}
              <span className="body-secondary-semibold text-primary-800 dark:text-black">
                {" "}
                {slippage}%
              </span>
            </div>
          )}
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
