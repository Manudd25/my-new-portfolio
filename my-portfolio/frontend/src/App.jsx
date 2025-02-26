import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PortfolioLanding from "../src/components/FloatingCode";
import About from "../src/pages/About";
import Projects from "../src/pages/Projects";
import Contact from "../src/pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />


      </Routes>
    </Router>
  );
}

export default App;