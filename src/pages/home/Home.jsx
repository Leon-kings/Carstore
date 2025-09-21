/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Hero } from "../../components/hero/Hero";
import { About } from "../about/About";
import { Services } from "../services/Services";
import { CarSearch } from "../../components/search/Search";
import { NewFeatures } from "../features/Features";
import { Products } from "../products/Products";
import { Testimonials } from "../testimony/Testimony";
import { FAQ } from "../../components/faq/FAQ";
import { motion, AnimatePresence } from "framer-motion";
import { KeyboardArrowUp } from "@mui/icons-material";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="w-full relative">
        <Hero />
        <About />
        <Services />
        <CarSearch />
        <NewFeatures />
        <Products />
        <Testimonials />
        <FAQ />
        
        {/* Return to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-violet-400 to-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Return to top"
            >
              <KeyboardArrowUp className="text-2xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}