import React, { useState } from 'react';

/**
 * Componente MantenimientosView: Módulo para el control de tareas de limpieza, 
 * cambios de agua y revisiones periódicas en los acuarios de BettaSoft.
 */
const MantenimientosView = () => {
  // Estado inicial con registros de mantenimiento de ejemplo
  const [mantenimientos, setMantenimientos] = useState([
    { id: 1, acuario: 'Acuario Principal (Sala)', tipo: 'Cambio parcial de agua (30%)', fecha: '2026-11-10', estado: 'Pendiente', notas: 'Usar acondicionador y medir cloro.' },
    { id: 2, acuario: 'Acuario Plantao (Oficina)', tipo: 'Limpieza de filtro y esponjas', fecha: '2026-11-08', estado: 'Completado', notas: 'Flujo de agua restaurado correctamente.' },
  ]);

  // Estado para el formulario de nuevo mantenimiento
  const [formData, setFormData] = useState({
    acuario: 'Acuario Principal (Sala)',
    tipo: 'Cambio parcial de agua',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente',
    notas: ''
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador para agregar un mantenimiento
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fecha) {
      alert('Por favor, selecciona una fecha válida.');
      return;
    }

    const nuevoMantenimiento = {
      id: Date.now(),
      ...formData
    };

    setMantenimientos([...mantenimientos, nuevoMantenimiento]);
    
    // Reiniciar formulario básico
    setFormData({
      acuario: 'Acuario Principal (Sala)',
      tipo: 'Cambio parcial de agua',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      notas: ''
    });
  };

  // Función para eliminar un registro de mantenimiento
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de mantenimiento?')) {
      setMantenimientos(mantenimientos.filter(m => m.id !== id));
    }
  };

  // Función para alternar el estado (Pendiente / Completado)
  const toggleEstado = (id) => {
    setMantenimientos(mantenimientos.map(m => {
      if (m.id === id) {
        return { ...m, estado: m.estado === 'Pendiente' ? 'Completado' : 'Pendiente' };
      }
      return m;
    }));
  };

  return (
    <div className="container py-4">
      {/* Encabezado del Módulo */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark">Control de Mantenimientos</h1>
          <p className="text-muted mb-0">Gestión de limpiezas, cambios de agua y tareas programadas</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario de Registro */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white fw-bold">
              Programar Mantenimiento
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Acuario Objetivo</label>
                  <select 
                    className="form-select" 
                    name="acuario" 
                    value={formData.acuario} 
                    onChange={handleChange}
                  >
                    <option value="Acuario Principal (Sala)">Acuario Principal (Sala)</option>
                    <option value="Acuario Plantao (Oficina)">Acuario Plantao (Oficina)</option>
                    <option value="Nano Betta Golfito">Nano Betta Golfito</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Tipo de Tarea</label>
                  <select 
                    className="form-select" 
                    name="tipo" 
                    value={formData.tipo} 
                    onChange={handleChange}
                  >
                    <option value="Cambio parcial de agua">Cambio parcial de agua</option>
                    <option value="Limpieza de filtro">Limpieza de filtro</option>
                    <option value="Test de parámetros">Test de parámetros</option>
                    <option value="Mantenimiento general">Mantenimiento general</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Fecha Programada</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="fecha" 
                    value={formData.fecha} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Estado Inicial</label>
                  <select 
                    className="form-select" 
                    name="estado" 
                    value={formData.estado} 
                    onChange={handleChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Observaciones / Notas</label>
                  <textarea 
                    className="form-control" 
                    name="notas" 
                    rows="2"
                    value={formData.notas} 
                    onChange={handleChange}
                    placeholder="Ej. Añadir 2 gotas de anticloro..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm">
                  <i className="bi bi-calendar-plus me-2"></i> Guardar Tarea
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla de Listado */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold py-3">
              Historial y Tareas Programadas
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-muted small text-uppercase">
                    <tr>
                      <th>Acuario</th>
                      <th>Tarea</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mantenimientos.length > 0 ? (
                      mantenimientos.map((m) => (
                        <tr key={m.id}>
                          <td className="fw-bold text-dark">{m.acuario}</td>
                          <td>
                            <div>{m.tipo}</div>
                            {m.notas && <small className="text-muted">{m.notas}</small>}
                          </td>
                          <td>{m.fecha}</td>
                          <td>
                            <span 
                              className={`badge ${m.estado === 'Completado' ? 'bg-success' : 'bg-warning text-dark'} cursor-pointer`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => toggleEstado(m.id)}
                              title="Haz clic para cambiar estado"
                            >
                              {m.estado}
                            </span>
                          </td>
                          <td className="text-end">
                            <button 
                              onClick={() => toggleEstado(m.id)} 
                              className="btn btn-outline-success btn-sm me-1"
                              title="Cambiar estado"
                            >
                              <i className="bi bi-check2"></i>
                            </button>
                            <button 
                              onClick={() => handleDelete(m.id)} 
                              className="btn btn-outline-danger btn-sm"
                              title="Eliminar tarea"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No hay mantenimientos programados actualmente.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantenimientosView;