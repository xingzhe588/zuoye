import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Menu from './components/menu';
import Login from './components/login';
import Footer from './components/Footer';
import DishDetail from './components/DishDetail';

import { ThemeProvider } from './context/ThemeContext';
import ScrollToHashElement from './components/ScrollToHashElement';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Navbar toggle={toggle} />
              <Sidebar isOpen={isOpen} toggle={toggle} />
              <ScrollToHashElement />
              <Hero />
              <About />
              <Features />
              <Services />
              <Pricing />
              <FAQ />
              <Footer />
            </div>
          } />

          <Route path="/menu" element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Navbar toggle={toggle} />
              <Sidebar isOpen={isOpen} toggle={toggle} />
              <Menu />
            </div>
          } />

          <Route path="/login" element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Login />
            </div>
          } />

          <Route path="/food/:id" element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Navbar toggle={toggle} />
              <Sidebar isOpen={isOpen} toggle={toggle} />
              <DishDetail />
            </div>
          } />
          
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
