import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Sidebar from './components/Common/Sidebar';
import RoutesConfig from './RoutesConfig';
import { AuthProvider } from './context/AuthContext';
import { CarreterasProvider } from './context/CarreterasContext';
import './assets/styles/main.css'; // Asegúrate de que los estilos CSS están importados

function App() {
  return (
    <AuthProvider>
      <CarreterasProvider>
        <Router>
          <Header />
          <div className="main-content">
            <Sidebar />
            <Routes>
              <Route path="*" element={<RoutesConfig />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CarreterasProvider>
    </AuthProvider>
  );
}

export default App;
