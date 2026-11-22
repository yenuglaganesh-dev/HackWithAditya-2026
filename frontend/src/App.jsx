import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Technology from './pages/Technology';
import UseCases from './pages/UseCases';
import Assistant from './pages/Assistant';

function Layout() {
  const location = useLocation();
  const isAssistantRoute = location.pathname === '/assistant';

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </div>
      {/* Hide website footer in full-screen AI assistant interactive view */}
      {!isAssistantRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
