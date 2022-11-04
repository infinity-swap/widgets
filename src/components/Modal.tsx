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
      <div className={"h6-semibold text-[var(--textDark)]"}>{title}</div>
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
  // const { themeVariables, setCSSVariables } = useContext(ThemeContext);

  return (
    <>
      {isOpen ? (
        <>
          <div className="">
            <div
              className={`fixed justify-center items-center overflow-x-hidden overflow-y-auto flex inset-0 z-50 ${
                isOpen ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`fixed inset-0 bg-black ${
                  isOpen ? "opacity-50" : "pointer-events-none opacity-0"
                }`}
                onClick={onClose}
              ></div>
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 ">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
Modal.Header = Header;

export default Modal;
