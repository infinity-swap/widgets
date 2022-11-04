import React from "react";
import { SwapWidget } from "./components";
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<any>({ textDark: "red" });
  return (
    <div className="App">
      <SwapWidget theme={theme} />
      <div className="w-full">
        <button onClick={() => setIsOpen(true)}>Click to use Swap</button>
      </div>
      <div className="pt-3">
        <button
          onClick={() =>
            setTheme({
              primary: "blue",
              container: "black",
              inputContainer: "purple",
              textDark: "green",
            })
          }
        >
          change theme
        </button>
      </div>
    </div>
  );
}

export default App;
