'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/styles/components/cookie-banner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookiePreference = localStorage.getItem('fynit_cookies_accepted');
    
    if (cookiePreference === 'true') {
      setHasAccepted(true);
    } else if (!cookiePreference) {
      // Small delay so it doesn't pop up immediately on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fynit_cookies_accepted', 'true');
    setHasAccepted(true);
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('fynit_cookies_accepted', 'false');
    setIsVisible(false);
  };

  return (
    <>
      {/* Carga Google Analytics SOLO si el usuario ha aceptado */}
      {hasAccepted && <GoogleAnalytics gaId="G-PVYLFYNETX" />}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="cookie-banner-container"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="cookie-banner-glass">
              <div className="cookie-header">
                <div className="cookie-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                    <path d="M8.5 8.5v.01"></path>
                    <path d="M16 12.5v.01"></path>
                    <path d="M12 16v.01"></path>
                    <path d="M11 11v.01"></path>
                    <path d="M15 8.5v.01"></path>
                  </svg>
                </div>
                <h3 className="cookie-title">Tu privacidad importa</h3>
              </div>
              
              <p className="cookie-text">
                Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y entender de dónde provienen nuestros visitantes. Al hacer clic en "Aceptar", aceptas nuestro uso de cookies.
              </p>
              
              <div className="cookie-actions">
                <button onClick={handleReject} className="btn-cookie-reject">
                  Solo necesarias
                </button>
                <button onClick={handleAccept} className="btn-cookie-accept">
                  Aceptar todas
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
