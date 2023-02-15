import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App h-screen text-center p-5 bg-orange-100 relative">
      <Board />
    </div>
  );
}

export default App;
