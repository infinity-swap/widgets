import React from "react";
import { SwapWidget } from "./components";
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="App">
      <SwapWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <button onClick={() => setIsOpen(true)}>Open modal</button>
    </div>
  );
}

export default App;
