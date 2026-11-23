import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    return localStorage.getItem('bhashabridge_selected_code') || 'auto';
  });

  const changeLanguage = (code) => {
    setSelectedLanguageState(code);
    const targetLang = code === 'auto' ? 'en' : (code.startsWith('te') ? 'te' : code.startsWith('hi') ? 'hi' : 'en');
    i18n.changeLanguage(targetLang);
    try {
      localStorage.setItem('bhashabridge_lang', targetLang);
      localStorage.setItem('bhashabridge_selected_code', code);
    } catch {}
  };

  useEffect(() => {
    const code = selectedLanguage;
    const targetLang = code === 'auto' ? 'en' : (code.startsWith('te') ? 'te' : code.startsWith('hi') ? 'hi' : 'en');
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'bhashabridge_selected_code' && e.newValue) {
        setSelectedLanguageState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
