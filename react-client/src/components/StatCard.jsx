import React from 'react';

/**
 * Componente StatCard: Tarjeta métrica reutilizable para mostrar indicadores rápidos.
 * Utiliza props para dinamizar el título, el valor numérico, el icono y los estilos de Bootstrap.
 */
const StatCard = ({ title, value, iconClass, bgVariant = 'primary' }) => {
  return (
    <div className={`card border-start border-4 border-${bgVariant} shadow-sm h-100 py-2`}>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col">
            <div className="text-xs font-weight-bold text-uppercase mb-1 text-muted">
              {title}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {value}
            </div>
          </div>
          {iconClass && (
            <div className="col-auto">
              <i className={`${iconClass} fs-2 text-${bgVariant}`}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;