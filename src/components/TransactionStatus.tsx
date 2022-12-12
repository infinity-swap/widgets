import clsx from "clsx";
import React from "react";
import {
  ArrowRightIcon,
  ErrorIcon,
  LoadingIcon,
  SuccessIcon,
} from "../assets/svg/Icons";
import { Token } from "../types";
import Button from "./Button";
import Loader from "./Loader";
import Logo from "./Logo";
import Overlay from "./Overlay";

interface TransactionStatusProps {
  isOpen: boolean;
  inToken: Token;
  outToken: Token;
  inAmount: number | string;
  outAmount: number | string;
  status: {
    title: string;
    message?: string;
    type: string;
  };
  onClose: () => void;
}

const TokenWithAmount = ({ token, amount }) => {
  return (
    <div className="flex items-center space-x-2">
      <div>
        <Logo symbol={token?.symbol} logoURI={token?.logo} />
      </div>
      <div>
        {amount} {token?.symbol}
      </div>
    </div>
  );
};

export const TransactionStatus = ({
  isOpen,
  onClose,
  inToken,
  outToken,
  inAmount,
  outAmount,
  status = {
    title: "Transaction pending",
    message: "",
    type: "pending",
  },
}: TransactionStatusProps) => {
  const btnStyle = clsx(
    status.type === "error" && "bg-[var(--error)]",
    "w-full h-[52px] rounded-[16px]"
  );
  return (
    <Overlay isOpen={isOpen} zIndex={20}>
      <div className="flex flex-col justify-around h-[300px]">
        <div className="">
          <div className="flex  justify-center ">
            <div>
              {status.type === "pending" && (
                <Loader className=" h-[80px] w-[80px]" />
              )}
              {status.type === "error" && (
                <ErrorIcon className="cursor-pointer stroke-[var(--error)] h-[80px] w-[80px]" />
              )}
              {status.type === "success" && <SuccessIcon />}
            </div>
          </div>
          <div className="text-center pt-6 ">
            <div className="font-medium text-lg">{status.title}</div>
          </div>
          {status.message && (
            <div className="text-center pt-2 ">
              <div className="font-medium text-[var(--textSecondary)] text-sm">
                {status.message}
              </div>
            </div>
          )}
        </div>
        {status.type !== "error" && (
          <div className="p-3 bg-[var(--module)] rounded-xl">
            <div className="flex justify-between">
              <div>
                <TokenWithAmount token={inToken} amount={inAmount} />
              </div>
              <div>
                <ArrowRightIcon className="stroke-[var(--textPrimary)]" />
              </div>
              <div>
                <TokenWithAmount token={outToken} amount={outAmount} />
              </div>
            </div>
          </div>
        )}
        <div>
          <Button onClick={() => onClose()} className={btnStyle}>
            Close
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
