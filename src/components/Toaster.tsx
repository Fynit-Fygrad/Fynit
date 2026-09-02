'use client';
import { useEffect, useState } from 'react';

export const showComingSoon = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  const event = new CustomEvent('show-toast', { 
    detail: { message: '¡Próximamente! Estamos preparando esta sección para ti.' }
  });
  window.dispatchEvent(event);
};

export default function Toaster() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      setToast({ message: customEvent.detail.message, id: Date.now() });
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#111827',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        fontFamily: "'Sora', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideUpToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}
    >
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px', borderRadius: '50%', display: 'flex' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <span>{toast.message}</span>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpToast {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
