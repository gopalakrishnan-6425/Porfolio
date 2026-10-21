import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './styles/global.css';
import './styles/sidebar.css';
import './styles/logos.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import App from './App.jsx';

// The single-file preview build sets VITE_HASH so routes work without a server.
const Router = import.meta.env.VITE_HASH ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
