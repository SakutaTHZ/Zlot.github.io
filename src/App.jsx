import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import SlotMachine from "./components/SlotMachine";
import logo from "/Zlot outline.svg"

function App() {
  const checkData = () => {
    !localStorage.getItem("money") && localStorage.setItem("money", 10000);
  };

  checkData();

  return (
    <Router>
      <section className="gameScreen flex justify-center items-center">
        
      <img src={logo} alt="logo" className="fixed top-3 right-3 size-10 opacity-10"/>
        <SlotMachine />
      </section>
    </Router>
  );
}

export default App;
