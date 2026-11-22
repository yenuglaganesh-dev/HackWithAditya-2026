import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SovereignStudio from './pages/SovereignStudio';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Technology from './pages/Technology';
import UseCases from './pages/UseCases';
import Assistant from './pages/Assistant';

function Layout() {
  const location = useLocation();
  const isSovereignStudio = location.pathname === '/' || location.pathname === '/studio';
  const isAssistantRoute = location.pathname === '/assistant';

  if (isSovereignStudio) {
    return <SovereignStudio />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </div>
      {!isAssistantRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SovereignStudio />} />
        <Route path="/studio" element={<SovereignStudio />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
