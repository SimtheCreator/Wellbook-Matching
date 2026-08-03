import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { TrackerProvider } from './context/TrackerContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrackerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TrackerProvider>
  </StrictMode>
);
