import React from "react";
import { SwapWidget } from "./components";
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="App">
      <SwapWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex justify-center items-center h-screen w-full">
        <button onClick={() => setIsOpen(true)}>Click to use Swap</button>
      </div>
    </div>
  );
}

export default App;
