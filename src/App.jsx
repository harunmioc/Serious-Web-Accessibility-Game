import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import Challenge from "./screens/Challenge";
import Simulation from "./screens/Simulation";
import Scoreboard from "./screens/Scoreboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <Header />
        <main className="pt-24 px-6 max-w-screen-xl mx-auto flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
