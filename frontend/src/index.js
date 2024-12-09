import React from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot
import App from './App';
import './assets/styles/main.css';

const container = document.getElementById('root');
const root = createRoot(container); // Crear root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
