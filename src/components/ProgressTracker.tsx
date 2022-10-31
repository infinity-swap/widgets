import { useReducer } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import { ReactComponent as ErrorIcon } from "../assets/svg/error.svg";
import SuccessTick from "../assets/images/success-tick.png";
import PgtCover from "../assets/images/pgt-cover.png";

interface stepType {
  title: string;
  action: string;
  loading: boolean;
  error: boolean;
}
interface stepPayloadType extends stepType {
  newStep?: stepType;
}
interface initialStateType {
  open?: boolean;
  title?: string;
  activeStep?: number;
  steps: stepType[];
}

interface ProgressTrackerProps {
  isOpen: boolean;
  message: string;
  containerClassName?: string;
  onClose: () => void;
  steps: stepType[];
  activeStep: number;
}

export const initialState = {
  open: false,
  title: "",
  activeStep: 0,
  steps: [],
};

function init(
  initialData: stepPayloadType = {
    title: "",
    action: "",
    loading: false,
    error: false,
  }
) {
  return { ...initialState, ...initialData };
}

function reducer(
  state: initialStateType,
  action: { type: string; payload: any }
) {
  const payload = action.payload ?? {};
  let activeStep: number = 0;
  let steps = [];
  switch (action.type) {
    case "open":
      return { ...state, open: true, ...payload };
    case "close":
      return { ...state, open: false, ...payload };
    case "next":
      activeStep = state.activeStep!;
      steps = state?.steps.map((step, index) => {
        if (index === activeStep) {
          return { ...step, error: false, loading: false };
        }
        return step;
      });
      return { ...state, steps, activeStep: activeStep + 1, ...payload };
    case "add_step": {
      const { newStep, ...rest } = payload;
      return { ...state, steps: [...state?.steps, newStep], ...rest };
    }
    case "error":
      activeStep = state.activeStep!;
      steps = state.steps.map((step, index) => {
        if (index === activeStep) {
          return { ...step, ...payload, error: true, loading: false };
        }
        return step;
      });
      return { ...state, steps, ...payload };
    case "reset":
      return init(payload);
    default:
      throw new Error("unexpected type");
  }
}

export function useProgressTracker(initialData: any) {
  return useReducer(reducer, initialData, init);
}

export default function ProgressTracker({
  isOpen,
  message,
  onClose,
  steps = [],
  activeStep = 0,
}: ProgressTrackerProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} zIndex={20}>
      <div className="bg-white dark:bg-dark-900 rounded-2xl w-full md:w-[360px]">
        <div className="w-full h-14">
          <img
            className="object-cover w-full h-14 rounded-t-2xl"
            src={PgtCover}
            alt="progress tracker header"
          />
        </div>
        <div className="p-6 divide-y divide-slate-300">
          <h4 className="pb-4 font-inter h4-semibold text-secondary-black">
            {message}
          </h4>
          <div className="pt-4">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  data-testid="progress-tracker-step"
                  className={`space-y-2 ${
                    index <= activeStep ? "opacity-[1]" : "opacity-[.5]"
                  }`}
                >
                  <div className="flex flex-row items-center">
                    {step.error && !step.loading && <ErrorIcon />}
                    {!step.error && !step.loading && (
                      <img src={SuccessTick} alt="success tick" />
                    )}
                    {step.loading && <Loader height={16} width={16} />}

                    <h6 className="font-inter h4-semibold text-secondary-black ml-4">
                      {step.title}
                    </h6>
                  </div>
                  <p className="font-inter body-primary leading-6 ml-8">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
