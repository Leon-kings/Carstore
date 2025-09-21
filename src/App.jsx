import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import { Navbar } from "./components/navbar/Navbar";
import { About } from "./pages/about/About";
import { Team } from "./pages/team/Team";
import { Services } from "./pages/services/Services";
import { NewFeatures } from "./pages/features/Features";
import { Products } from "./pages/products/Products";
import Home from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Testimonials } from "./pages/testimony/Testimony";
import { FAQ } from "./components/faq/FAQ";

export default function App() {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/features" element={<NewFeatures />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
