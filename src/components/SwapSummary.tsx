import React from "react";
import { ArrowRightIcon, InfoIcon, SettingsIcon } from "../assets/svg/Icons";
import { Token } from "../types";
import Button from "./Button";
import { InfoLabel } from "./InfoLabel";
import Overlay from "./Overlay";
import { TokenWithAmount } from "./TransactionStatus";

interface SwapSummaryProps {
  isOpen?: boolean;
  inToken: Token;
  outToken: Token;
  inAmount: number | string;
  outAmount: number | string;
  onClose: () => void;
  confirmSwap: () => void;
}
export const SwapSummary = ({
  isOpen,
  onClose,
  confirmSwap,
  inToken,
  outToken,
  inAmount,
  outAmount,
}) => {
  return (
    <Overlay isOpen={isOpen}>
      <div className="flex flex-col justify-between h-[300px] ">
        <div>
          <div>
            <Overlay.Header title={"Swap Summary"} onClose={() => onClose()}>
              <div>
                <SettingsIcon className="cursor-pointer fill-[var(--textSecondary)]" />
              </div>
            </Overlay.Header>
          </div>
          <div className="border border-solid border-[var(--interactiveBorder)] mt-4 mb-1" />
          <div className="pt-3">
            <div className="p-3 bg-[var(--module)] rounded-t-xl">
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
            <div className="pt-[2px]">
              <InfoLabel
                className="rounded-t-none"
                Icon={<InfoIcon className="fill-[var(--secondary)]" />}
                message="1 DAI"
              />
            </div>
          </div>
        </div>

        <div className="pt-10">
          <div className="text-xs pb-3 text-[var(--textSecondary)] font-normal">
            Output is estimated. You will receive at least {outAmount}{" "}
            {outToken?.symbol} or the transaction will revert.
          </div>
          <div>
            <Button
              className="w-full h-[52px] rounded-[16px]"
              data-testid="swap-btn"
              onClick={() => confirmSwap(true)}
            >
              Confirm Swap
            </Button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};
