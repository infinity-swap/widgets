import React from "react";
import SpinningLoaderDark from "../assets/gif/loader-light.gif";

export default function Loader({
  height = 20,
  width = 20,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <div>
      <img
        src={SpinningLoaderDark}
        alt="loader"
        height={height}
        width={width}
      />
    </div>
  );
}
