import React, { useState } from 'react';

/**
 * Componente PecesView: Módulo para la gestión y registro de peces en BettaSoft.
 * Permite agregar, listar y eliminar peces, manteniendo la relación con los acuarios registrados.
 */
const PecesView = () => {
  // Estado inicial con registros de ejemplo
  const [peces, setPeces] = useState([
    { id: 1, nombre: 'Betta Splendens', especie: 'Luchador de Siam', acuario: 'Acuario Principal (Sala)', cantidad: 1, tipoAgua: 'Dulce' },
    { id: 2, nombre: 'Guppy Neón', especie: 'Poecilia reticulata', acuario: 'Acuario Plantao (Oficina)', cantidad: 5, tipoAgua: 'Dulce' },
  ]);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    acuario: 'Acuario Principal (Sala)',
    cantidad: 1,
    tipoAgua: 'Dulce'
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador para agregar un nuevo pez
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.especie.trim()) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    const nuevoPez = {
      id: Date.now(),
      ...formData,
      cantidad: parseInt(formData.cantidad, 10)
    };

    setPeces([...peces, nuevoPez]);
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      especie: '',
      acuario: 'Acuario Principal (Sala)',
      cantidad: 1,
      tipoAgua: 'Dulce'
    });
  };

  // Función para eliminar un pez
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de pez?')) {
      setPeces(peces.filter(pez => pez.id !== id));
    }
  };

  return (
    <div className="container py-4">
      {/* Encabezado del Módulo */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark">Gestión de Peces y Especies</h1>
          <p className="text-muted mb-0">Control y registro de especies acuáticas asociadas a los acuarios</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario de Registro */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white fw-bold">
              Registrar Nuevo Pez
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Nombre / Apodo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder="Ej. Rayitas"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Especie</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="especie" 
                    value={formData.especie} 
                    onChange={handleChange} 
                    placeholder="Ej. Betta splendens"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Acuario Asignado</label>
                  <select 
                    className="form-select" 
                    name="acuario" 
                    value={formData.acuario} 
                    onChange={handleChange}
                  >
                    <option value="Acuario Principal (Sala)">Acuario Principal (Sala)</option>
                    <option value="Acuario Plantao (Oficina)">Acuario Plantao (Oficina)</option>
                    <option value="Acuario Cuarentena">Acuario Cuarentena</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Cantidad</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="cantidad" 
                    min="1" 
                    value={formData.cantidad} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Tipo de Agua</label>
                  <select 
                    className="form-select" 
                    name="tipoAgua" 
                    value={formData.tipoAgua} 
                    onChange={handleChange}
                  >
                    <option value="Dulce">Dulce</option>
                    <option value="Salada">Salada</option>
                    <option value="Salobre">Salobre</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm">
                  <i className="bi bi-plus-circle me-2"></i> Guardar Pez
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla de Listado */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold py-3">
              Listado de Peces Registrados
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-muted small text-uppercase">
                    <tr>
                      <th>Nombre</th>
                      <th>Especie</th>
                      <th>Acuario</th>
                      <th>Cant.</th>
                      <th>Agua</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peces.length > 0 ? (
                      peces.map((pez) => (
                        <tr key={pez.id}>
                          <td className="fw-bold text-dark">{pez.nombre}</td>
                          <td className="text-muted">{pez.especie}</td>
                          <td>
                            <span className="badge bg-light text-dark border">{pez.acuario}</span>
                          </td>
                          <td><span className="badge bg-primary">{pez.cantidad}</span></td>
                          <td>{pez.tipoAgua}</td>
                          <td className="text-end">
                            <button 
                              onClick={() => handleDelete(pez.id)} 
                              className="btn btn-outline-danger btn-sm"
                              title="Eliminar registro"
                            >
                              <i className="bi bi-trash"></i> Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No hay peces registrados actualmente.
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

export default PecesView;