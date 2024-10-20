import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import SlotMachine from "./components/SlotMachine";

function App() {
  const checkData = () => {
    !localStorage.getItem("money") && localStorage.setItem("money", 10000);
  };

  checkData();

  return (
    <Router>
      <section className="gameScreen flex justify-center items-center">
        <SlotMachine />
      </section>
    </Router>
  );
}

export default App;
