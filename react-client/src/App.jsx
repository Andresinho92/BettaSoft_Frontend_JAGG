import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AcuariosView from './views/AcuariosView';
import DashboardView from './views/DashboardView';
import PecesView from './views/PecesView';
import MantenimientosView from './views/MantenimientosView';
import ReportesView from './views/ReportesView';
import ConfiguracionView from './views/ConfiguracionView';

/**
 * Componente principal App: Configura el enrutamiento global de la aplicación React
 * y mantiene la estructura base (Navbar y Footer) en todas las vistas de BettaSoft.
 */
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Barra de navegación superior compartida */}
        <Navbar />

        {/* Contenedor principal de vistas con enrutamiento */}
        <main className="flex-fill container my-4">
          <Routes>
            {/* Ruta raíz: Carga el Dashboard oficial */}
            <Route path="/" element={<DashboardView />} />

            {/* Módulos completos del sistema */}
            <Route path="/acuarios" element={<AcuariosView />} />
            <Route path="/peces" element={<PecesView />} />
            <Route path="/mantenimientos" element={<MantenimientosView />} />
            <Route path="/reportes" element={<ReportesView />} />
            <Route path="/configuracion" element={<ConfiguracionView />} />

            {/* Ruta explícita de Dashboard */}
            <Route path="/dashboard" element={<DashboardView />} />
          </Routes>
        </main>

        {/* Pie de página global reutilizable */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;