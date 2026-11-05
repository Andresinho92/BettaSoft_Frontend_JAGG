import React from 'react';
import StatCard from '../components/StatCard';

/**
 * Componente DashboardView: Vista principal de BettaSoft que muestra 
 * las métricas globales del sistema y accesos rápidos.
 */
const DashboardView = () => {
  return (
    <div className="container py-4">
      {/* Encabezado del Dashboard */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Dashboard de BettaSoft</h1>
        <p className="text-muted mb-0">Bienvenido al sistema central de gestión y control acuícola</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <StatCard 
            title="TOTAL ACUARIOS" 
            value="3" 
            borderColor="border-primary" 
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="TOTAL PECES" 
            value="7" 
            borderColor="border-success" 
          />
        </div>
        <div className="col-md-4">
          <StatCard 
            title="MANTENIMIENTOS PENDIENTES" 
            value="1" 
            borderColor="border-warning" 
          />
        </div>
      </div>

      {/* Panel informativo de bienvenida */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h4 className="fw-bold text-info mb-3">
            <i className="bi bi-water me-2"></i> Estado General de los Ecosistemas
          </h4>
          <p className="text-muted mb-3">
            BettaSoft React se encuentra operando al 100% de su capacidad en esta versión SPA. Todos los módulos (Acuarios, Peces, Mantenimientos, Reportes y Configuración) están sincronizados con los datos de tus tanques en casa.
          </p>
          <hr />
          <div className="d-flex gap-2 flex-wrap">
            <span className="badge bg-primary">Acuario Principal (14L)</span>
            <span className="badge bg-success">Acuario Plantao (9L)</span>
            <span className="badge bg-info text-dark">Nano Betta Golfito (6L)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;