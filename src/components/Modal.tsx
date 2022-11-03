import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ReactComponent as CloseIcon } from "../assets/svg/close.svg";

interface ModalProps {
  isOpen?: boolean;
  zIndex?: number;
  onClose: () => void;
  children?: JSX.Element;
}
const Header = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className={`w-full flex justify-between items-center`}>
      <div className={"h6-semibold text-black"}>{title}</div>
      <div>
        <div className="hidden sm:block">
          <CloseIcon
            onClick={() => onClose()}
            className="w-6 h-6 cursor-pointer"
            stroke="var(--secondary-black)"
          />
        </div>
      </div>
    </div>
  );
};

function Modal({ isOpen = false, onClose, children, zIndex = 10 }: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        style={{ zIndex }}
        onClose={onClose}
      >
        <div className="swap-widget light">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div style={{ zIndex }} className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 ">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
Modal.Header = Header;

export default Modal;
