import React from 'react';
import ListUsers from '../components/Usuarios/ListUsers';
import ListIncidencias from '../components/Incidencias/ListIncidencias';
import ListCarreteras from '../components/Home/ListCarreteras';
import ListMunicipios from '../components/Municipios/ListMunicipios';
import Sidebar from '../components/Common/Sidebar';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

function AdminDashboard() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Sidebar />
        <main>
          <h1>Panel de Control del Administrador</h1>
          <section>
            <h2>Usuarios</h2>
            <ListUsers />
          </section>
          <section>
            <h2>Incidencias</h2>
            <ListIncidencias />
          </section>
          <section>
            <h2>Carreteras</h2>
            <ListCarreteras />
          </section>
          <section>
            <h2>Municipios</h2>
            <ListMunicipios />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
