import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { SplashScreen } from '@capacitor/splash-screen';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Ensure splash screen is hidden AFTER render
defineCustomElements(window);
SplashScreen.hide().catch(err => {
  console.warn('SplashScreen hide error:', err);
});
