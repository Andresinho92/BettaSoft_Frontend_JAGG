import React from 'react';

/**
 * Componente Footer: Pie de página reutilizable para todas las vistas de BettaSoft.
 * Mantiene la identidad institucional y utiliza clases utilitarias de Bootstrap.
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto shadow-sm">
      <div className="container">
        <p className="mb-1 fw-bold">BettaSoft - Sistema de Gestión de Acuarios</p>
        <p className="mb-0 text-muted small">
          &copy; {new Date().getFullYear()} Programa ADSO • SENA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;