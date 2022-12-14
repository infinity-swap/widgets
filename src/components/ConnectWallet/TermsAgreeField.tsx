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
      <div className="bg-[var(--module)] rounded-lg">
        <div className="p-3">
          <div
            className="w-full rounded-[8px] box-border space-x-2 flex justify-between items-start  font-semibold bg-secondary-100 leading-6 text-[0.9rem]"
            onClick={() => onTermChange(!termAccepted)}
          >
            {(!principalId || step === 2) && (
              <span>
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
              <span className="body-secondary-semibold text-[var(--textPrimary)]">
                <span>
                  By connecting a wallet, you agree to Infinity swap{" "}
                  <a
                    href="https://infinityswap-documentation.web.app/docs/Infinity-swap-webapp/Terms%20of%20Use/"
                    target="_blank"
                    className="text-[var(--primaryActive)]"
                    rel="noreferrer"
                  >
                    <span> Terms of Service.</span>
                  </a>{" "}
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
      {showWarning && (
        <span className="text-[var(--error)] text-sm">
          Please accept terms and conditions first
        </span>
      )}
    </>
  );
};
export default TermsAgreeField;
