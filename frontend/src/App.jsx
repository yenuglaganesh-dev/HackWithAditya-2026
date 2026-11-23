import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import UseCases from './pages/UseCases';
import Assistant from './pages/Assistant';
import HowItWorks from './pages/HowItWorks';
import AgentsPage from './pages/AgentsPage';
import FallingParticles from './components/ui/FallingParticles';
import { LanguageProvider } from './context/LanguageContext';

// Scroll to top on route change or refresh
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#202124] flex flex-col font-sans relative selection:bg-orange-100 selection:text-[#F58220]">
      <FallingParticles />
      <Navbar />
      <div className="flex-1 relative z-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main Landing & Home Page */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />

          {/* Subpages in Clean White & Orange */}
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
          <Route path="/agents" element={<PageWrapper><AgentsPage /></PageWrapper>} />
          <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
          <Route path="/use-cases" element={<PageWrapper><UseCases /></PageWrapper>} />
          <Route path="/assistant" element={<PageWrapper><Assistant /></PageWrapper>} />

          {/* Catch-all fallback route to home page on refresh */}
          <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
