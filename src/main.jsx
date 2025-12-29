import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// index.css moved to inline in index.html to avoid render-blocking

// Register Service Worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail - service worker is optional
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
