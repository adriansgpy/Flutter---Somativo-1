import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safety polyfills para compatibilidade de ambiente e scripts externos
try {
  if (typeof window !== 'undefined' && window.fetch) {
    const originalFetch = window.fetch.bind(window);
    let activeFetch = originalFetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return activeFetch;
      },
      set(fn) {
        activeFetch = fn;
      },
      configurable: true,
      enumerable: true,
    });
  }
} catch (_) {}

if (typeof (String.prototype as any).padLeft === 'undefined') {
  (String.prototype as any).padLeft = function (length: number, char: string = ' ') {
    return this.padStart(length, char);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
