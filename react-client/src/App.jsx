import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AcuariosView from './views/AcuariosView';

/**
 * Componente principal App que define el enrutamiento con React Router.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal de acuarios */}
        <Route path="/acuarios" element={<AcuariosView />} />
        
        {/* Redirección por defecto al módulo de acuarios */}
        <Route path="*" element={<Navigate to="/acuarios" replace />} />
      </Routes>
    </Router>
  );
}

export default App;