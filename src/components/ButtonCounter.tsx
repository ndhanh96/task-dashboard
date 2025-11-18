"use client";

import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

function ButtonCounter() {
  const [count, setCount] = useState(0); // Starts at 0
  const theme = useContext(ThemeContext);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => setCount(count + 1)}
        className="cursor-pointer"
        aria-label="Increment button counter"
      >
        Click me
      </button>
      <p>{theme === "blue" ? "blue" : "dark"}</p>
    </div>
  );
}

export default ButtonCounter;
