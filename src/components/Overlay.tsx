import React from "react";
import clsx from "clsx";
import { ArrowLeftIcon, CloseIcon } from "../assets/svg/Icons";
import { Footer } from "./Footer";

interface OverlayProps {
  isOpen?: boolean;
  zIndex?: number;
  children?: JSX.Element;
  showFooter?: boolean;
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

function Overlay({
  isOpen = false,
  children,
  zIndex = 10,
  showFooter = false,
}: OverlayProps) {
  const show = false;
  const overlayStyle = clsx(
    isOpen ? "bottom-0 h-full" : "h-0 bottom-[100%]  ",
    "absolute  left-0 right-0 w-full overflow-hidden bg-[var(--container)] transition-all duration-500 ease z-10"
  );

  return (
    <div className={overlayStyle}>
      <div className="p-4 pb-0">
        <div>{children}</div>
      </div>
      {showFooter && (
        <div className="absolute bottom-1 left-[50%] -translate-x-2/4">
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
Overlay.Header = Header;
export default Overlay;
