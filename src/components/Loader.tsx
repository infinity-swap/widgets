import React from "react";
import SpinningLoaderDark from "../assets/gif/loader-light.gif";

export default function Loader() {
  return (
    <div>
      <img src={SpinningLoaderDark} alt="loader" height={20} width={20} />
    </div>
  );
}
