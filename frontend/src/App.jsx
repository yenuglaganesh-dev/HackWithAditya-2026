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
    <div className="min-h-screen bg-[#050506] text-[#f5f5f6] flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
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
        {/* Master Home Page with Sovereign Studio & Mosaic Prompt Template */}
        <Route path="/" element={<SovereignStudio />} />
        <Route path="/studio" element={<SovereignStudio />} />

        {/* Global Dark Glassmorphism Pages */}
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
