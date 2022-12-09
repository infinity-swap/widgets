import React from "react";
import clsx from "clsx";
import { ArrowLeftIcon, CloseIcon } from "../assets/svg/Icons";

interface OverlayProps {
  isOpen?: boolean;
  zIndex?: number;
  children?: JSX.Element;
}

interface HeaderProps {
  title: string;
  onClose: () => void;
  children?: JSX.Element;
}

const Header = ({ title, onClose, children }: HeaderProps) => {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div
          onClick={() => onClose()}
          className="flex items-center space-x-4 font-medium cursor-pointer"
        >
          <div>
            <ArrowLeftIcon className="stroke-[var(--textPrimary)]" />
          </div>
          <div className="text-[var(--textPrimary)]">{title}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

function Overlay({ isOpen = false, children, zIndex = 10 }: OverlayProps) {
  const show = false;
  const overlayStyle = clsx(
    isOpen
      ? "bottom-0 h-full  overflow-scroll"
      : "h-0 bottom-[100%]  overflow-hidden",
    "absolute  left-0 right-0 w-full  bg-[var(--container)] transition-all duration-500 ease z-10"
  );

  return (
    <div className={overlayStyle}>
      <div className="pt-5 pb-4 sm:p-4 sm:pb-4 ">
        <div>{children}</div>
      </div>
    </div>
  );
}
Overlay.Header = Header;
export default Overlay;
