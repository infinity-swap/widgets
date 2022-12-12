import clsx from "clsx";
import React, { useState } from "react";
import useStore, { setSlippageSelector } from "../store";
import Button from "./Button";
import Overlay from "./Overlay";
import Input from "./Input";
import { Footer } from "./Footer";

const slippagePercentages = [0.05, 0.1, 0.5, 1];
interface SwapSettingsProps {
  slippage: number;
  setSlippage: (splippage: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SwapSettings = ({
  slippage,
  setSlippage,
  isOpen,
  onClose,
}: SwapSettingsProps) => {
  const [customSlippage, setCustomSlippage] = useState(0);
  const storeSlippage = useStore(setSlippageSelector);

  const updateSlippage = (level) => {
    if (slippage === level) {
      setSlippage(0);
      storeSlippage(0);
    }
    if (slippage !== level) {
      setSlippage(level);
      storeSlippage(level);
    }
  };

  const addCustomSlippage = () => {
    const checkIfExists = slippagePercentages.find(
      (item) => item === customSlippage
    );
    if (customSlippage > 50)
      // handle error
      return;
    if (checkIfExists) return;
    if (customSlippage) {
      setSlippage(customSlippage);
      storeSlippage(customSlippage);
      onClose();
    }
  };
  return (
    <Overlay isOpen={isOpen} showFooter>
      <div>
        <div>
          <div>
            <Overlay.Header title={"Settings"} onClose={() => onClose()}>
              <div className="text-[var(--primaryActive)] font-medium text-base">
                Reset
              </div>
            </Overlay.Header>
          </div>
          <div className="border border-solid border-[var(--interactiveBorder)] my-4" />
          <div className="text-[var(--textPrimary)] font-medium text-sm">
            Set Slippage Tolerance
          </div>
          <div className="w-full flex flex-row justify-between font-semibold pt-3">
            <div className="flex space-x-2">
              {slippagePercentages.map((item) => (
                <Button
                  size="small"
                  variant="tab"
                  key={item}
                  onClick={() => {
                    updateSlippage(item);
                  }}
                  className={clsx(
                    `h-[36px] bg-[var(--interactive)] text-[var(--textPrimary)] `,
                    slippage === item &&
                      "bg-[--primary] text-[var(--textWhite)]"
                  )}
                  // isActive={slippage === item}
                >
                  <div className="text-xs">
                    {item !== 0 ? <span>{item}%</span> : <div>None</div>}
                  </div>
                </Button>
              ))}
            </div>
          </div>
          <div className="relative py-6">
            <div className="flex  justify-center">
              <div className="z-50 px-5 bg-white  text-[var(--textSecondary)]">
                OR
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <hr className="border border-[var(--interactiveBorder)]" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h6-semibold text-secondary-black mb-4">
              Enter slippage (%)
            </div>
            <div className="flex space-x-4">
              <div className="flex-grow">
                <Input
                  className="bg-secondary-100 h-full rounded-lg dark:text-white body-secondary-semibold text-secondary-800"
                  onChange={(e) => setCustomSlippage(Number(e.target.value))}
                  type="number"
                  placeholder="0.1%"
                />
              </div>
              <div>
                <Button
                  variant="primary"
                  applyDisabledStyle={!customSlippage}
                  onClick={() => addCustomSlippage()}
                >
                  <div className="px-2">
                    <span className="text-xs font-medium">SUBMIT</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default SwapSettings;
