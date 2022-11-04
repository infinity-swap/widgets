import { useContext } from "react";
import { WidgetProps } from "../../types";
import AppWrapper from "../AppWrapper";
import SwapWidgetComponent from "./SwapWidgetComponent";

export default function SwapWidget({ theme }: WidgetProps) {
  return (
    <AppWrapper>
      <SwapWidgetComponent theme={theme} />
    </AppWrapper>
  );
}
