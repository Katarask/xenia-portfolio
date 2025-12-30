import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// index.css moved to inline in index.html to avoid render-blocking

// Register Service Worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      // Silently fail - service worker is optional
      // Only log in development
      if (import.meta.env.DEV) {
        console.warn('Service Worker registration failed:', error);
      }
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
