import React from "react";
import useStore, { principalSelector } from "../../store";

interface TermsAgreeFieldTypes {
  step: number;
  termAccepted: boolean;
  showWarning: boolean;
  setShowWarning: (value: boolean) => void;
  setTermAccepted: (value: boolean) => void;
}

const TermsAgreeField = ({
  setTermAccepted,
  setShowWarning,
  step,
  termAccepted,
  showWarning,
}: TermsAgreeFieldTypes) => {
  const principalId = useStore(principalSelector);

  const onTermChange = (value: boolean) => {
    setTermAccepted(value);
    setShowWarning(false);
  };

  const defaultChecked: any = {};
  if (step === 2) {
    defaultChecked.checked = true;
    defaultChecked.value = true;
  }

  return (
    <>
      <div className="py-4">
        <div
          className="w-full rounded-[8px] box-border flex justify-between items-start p-[5%] font-semibold bg-secondary-100 leading-6 text-[0.9rem]"
          onClick={() => onTermChange(!termAccepted)}
        >
          {(!principalId || step === 2) && (
            <span className="px-3">
              <input
                type="checkbox"
                disabled={step === 2}
                {...defaultChecked}
                id="terms"
                className="space-x-1 accent-primary-500 w-[16px] h-[16px]"
                onChange={(e) => onTermChange(e.target.checked)}
                checked={termAccepted}
              />
            </span>
          )}
          <label htmlFor="terms" className="flex items-center">
            <span className="body-secondary-semibold">
              <span>
                By connecting a wallet, you agree to Infinity swap{" "}
                <a
                  href="https://infinityswap-documentation.web.app/docs/Infinity-swap-webapp/Terms%20of%20Use/"
                  target="_blank"
                  className="text-primary-800"
                  rel="noreferrer"
                >
                  <span> Terms of Service.</span>
                </a>{" "}
              </span>
            </span>
          </label>
        </div>
      </div>
      {showWarning && (
        <span className="text-red">
          Please accept terms and conditions first
        </span>
      )}
    </>
  );
};
export default TermsAgreeField;
