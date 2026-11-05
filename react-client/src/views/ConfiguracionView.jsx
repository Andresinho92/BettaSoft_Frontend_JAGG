import React, { useState } from 'react';

/**
 * Componente ConfiguracionView: Módulo de ajustes y preferencias del sistema BettaSoft.
 * Permite configurar perfiles, notificaciones y opciones de almacenamiento local.
 */
const ConfiguracionView = () => {
  // Estado local para los ajustes de configuración
  const [settings, setSettings] = useState({
    nombreUsuario: 'Andrés González',
    email: 'andres.gonzalez@sena.edu.co',
    unidadMedida: 'Litros (L) y Centímetros (cm)',
    alertasMantenimiento: true,
    modoOscuro: false,
    frecuenciaBackup: 'Semanal'
  });

  const [mensajeGuardado, setMensajeGuardado] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Manejador para guardar la configuración
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeGuardado(true);
    setTimeout(() => {
      setMensajeGuardado(false);
    }, 3000);
  };

  return (
    <div className="container py-4">
      {/* Encabezado del Módulo */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Configuración del Sistema</h1>
        <p className="text-muted mb-0">Ajusta las preferencias generales, perfil y parámetros de BettaSoft</p>
      </div>

      {/* Alerta de éxito al guardar */}
      {mensajeGuardado && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i> ¡Configuración guardada y aplicada correctamente!
        </div>
      )}

      <div className="row g-4">
        {/* Formulario de Configuración */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white fw-bold">
              Preferencias Generales
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Nombre del Acuariófilo / Administrador</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombreUsuario" 
                    value={settings.nombreUsuario} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Correo de Notificaciones</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={settings.email} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Unidad de Medida de Volumen</label>
                  <select 
                    className="form-select" 
                    name="unidadMedida" 
                    value={settings.unidadMedida} 
                    onChange={handleChange}
                  >
                    <option value="Litros (L) y Centímetros (cm)">Litros (L) y Centímetros (cm)</option>
                    <option value="Galones (US) y Pulgadas (in)">Galones (US) y Pulgadas (in)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Frecuencia de Respaldos Automáticos</label>
                  <select 
                    className="form-select" 
                    name="frecuenciaBackup" 
                    value={settings.frecuenciaBackup} 
                    onChange={handleChange}
                  >
                    <option value="Diaria">Diaria</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Mensual">Mensual</option>
                  </select>
                </div>

                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="alertasCheck" 
                    name="alertasMantenimiento"
                    checked={settings.alertasMantenimiento}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small fw-bold" htmlFor="alertasCheck">
                    Activar recordatorios y alertas de mantenimiento pendiente
                  </label>
                </div>

                <button type="submit" className="btn btn-primary fw-bold shadow-sm">
                  <i className="bi bi-save me-2"></i> Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Panel lateral de información */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-dark text-white fw-bold">
              Información de la App
            </div>
            <div className="card-body small">
              <p><strong>Proyecto:</strong> BettaSoft React</p>
              <p><strong>Programa:</strong> ADSO - SENA</p>
              <p><strong>Versión:</strong> 2.0.0 (Migración SPA)</p>
              <p className="mb-0 text-muted">Diseñado para gestión eficiente de múltiples ecosistemas acuáticos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionView;