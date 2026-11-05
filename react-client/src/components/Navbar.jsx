import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Componente Navbar: Barra de navegación superior global de BettaSoft.
 * Utiliza NavLink de react-router-dom para resaltar de forma activa el módulo en uso.
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Marca/Logo de la aplicación que redirige al Dashboard */}
        <Link className="navbar-brand fw-bold text-info" to="/">
          <i className="bi bi-water me-2"></i> BettaSoft React
        </Link>

        {/* Botón responsive para pantallas pequeñas */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/acuarios" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Módulo Acuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/peces" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Módulo Peces
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/mantenimientos" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Mantenimientos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/reportes" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Reportes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/configuracion" 
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}
              >
                Configuración
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;