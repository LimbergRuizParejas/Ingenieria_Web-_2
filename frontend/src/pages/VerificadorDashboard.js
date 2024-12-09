import React from 'react';
import ListCarreteras from '../components/Home/ListCarreteras';
import ListMunicipios from '../components/Municipios/ListMunicipios';
import ListIncidencias from '../components/Incidencias/ListIncidencias';
import Sidebar from '../components/Common/Sidebar';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const VerificadorDashboard = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <main>
          <h1>Panel de Control del Verificador</h1>
          <section>
            <h2>Carreteras</h2>
            <ListCarreteras />
          </section>
          <section>
            <h2>Municipios</h2>
            <ListMunicipios />
          </section>
          <section>
            <h2>Incidencias</h2>
            <ListIncidencias />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default VerificadorDashboard;
