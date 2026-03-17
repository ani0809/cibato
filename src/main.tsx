import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global Error Handler for White Screen of Death
window.onerror = function (message, source, lineno, colno, error) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = '#fee2e2';
  errorDiv.style.color = '#991b1b';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '999999';
  errorDiv.style.fontFamily = 'monospace';

  errorDiv.innerHTML = `
    <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Application Crashed</h1>
    <p><strong>Error:</strong> ${message}</p>
    <p><strong>Source:</strong> ${source}:${lineno}:${colno}</p>
    ${error ? `<pre style="margin-top: 10px; overflow: auto;">${error.stack}</pre>` : ''}
    <button onclick="window.location.reload()" style="margin-top: 10px; padding: 8px 16px; background: #991b1b; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload</button>
  `;
  document.body.appendChild(errorDiv);
};

createRoot(document.getElementById('root')!).render(
  <App />
);
