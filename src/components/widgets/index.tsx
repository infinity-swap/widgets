import AppWrapper from "../AppWrapper";
import SwapWidgetComponent from "./SwapWidgetComponent";

export default function SwapWidget({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AppWrapper>
      <SwapWidgetComponent isOpen={isOpen} onClose={onClose} />
    </AppWrapper>
  );
}
