"use client";

import React, { useContext, createContext } from "react";
import ButtonCounter from "./ButtonCounter";
import Counter from "./Counter";
export const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="blue">
      <Button />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className="themed-button-wrapper">
        <button
          style={{ background: theme === "blue" ? "#1890ff" : "white", color: theme === "blue" ? '#fff' : '#000' }}
          aria-pressed="false"
        >
          Themed Button A
        </button>
        <ButtonCounter />
      </div>
      <Counter />
    </>
  );
}

export default App;
