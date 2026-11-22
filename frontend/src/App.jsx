import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SovereignStudio from './pages/SovereignStudio';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Technology from './pages/Technology';
import UseCases from './pages/UseCases';
import Assistant from './pages/Assistant';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import AgentsPage from './pages/AgentsPage';

function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#f5faf7] text-slate-800 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Master Home Page with Studio Voice Console */}
        <Route path="/" element={<SovereignStudio />} />
        <Route path="/studio" element={<SovereignStudio />} />

        {/* Global Styled Pages (Clean Emerald & Mint Theme with High Contrast) */}
        <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="/agents" element={<PageWrapper><AgentsPage /></PageWrapper>} />
        <Route path="/technology" element={<PageWrapper><Technology /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
        <Route path="/use-cases" element={<PageWrapper><UseCases /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/assistant" element={<PageWrapper><Assistant /></PageWrapper>} />
      </Routes>
    </BrowserRouter>
  );
}
