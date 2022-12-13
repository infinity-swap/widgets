import React from "react";
import { LoadingIcon } from "../assets/svg/Icons";

export default function Loader({ className }: { className?: string }) {
  return (
    <div>
      <LoadingIcon
        className={` cursor-pointer stroke-[var(--accentActive)] h-[16px] w-[16px] ${className}`}
      />
    </div>
  );
}
