import { useState, useEffect } from "react";
import { Provider } from "jotai";
import "./App.css";
import { SvgCanvas } from "./SvgCanvas";

function App() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const callback = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);
  return (
    <Provider>
      <SvgCanvas width={size[0]} height={size[1]} />
    </Provider>
  );
}

export default App;
