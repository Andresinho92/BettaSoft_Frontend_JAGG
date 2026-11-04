import React, { useState } from 'react';
import Navbar from '../components/Navbar';

/**
 * Vista principal del Módulo de Acuarios en React para BettaSoft.
 * Implementa useState, eventos onChange/onSubmit, validaciones y map() con key.
 */
const AcuariosView = () => {
  // Estado inicial con algunos acuarios de ejemplo (simulando los datos de la BD)
  const [acuarios, setAcuarios] = useState([
    { id: 1, nombre: 'Acuario Principal', capacidad: '14L', tipo: 'Danios y Corydoras' },
    { id: 2, nombre: 'Acuario Guppies', capacidad: '9L', tipo: 'Guppies' },
    { id: 3, nombre: 'Nano Betta Golfito', capacidad: '6L', tipo: 'Betta Splendens' }
  ]);

  // Estado para controlar los campos del formulario de registro
  const [nuevoAcuario, setNuevoAcuario] = useState({
    nombre: '',
    capacidad: '',
    tipo: ''
  });

  // Estado para mensajes de error o validación
  const [error, setError] = useState('');

  // Manejador de eventos onChange para actualizar los inputs dinámicamente
  const handleChange = (e) => {
    setNuevoAcuario({
      ...nuevoAcuario,
      [e.target.name]: e.target.value
    });
  };

  // Manejador de eventos onSubmit para procesar el formulario con validación
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el recargo de la página

    // Validación de campos vacíos exigida por la guía
    if (!nuevoAcuario.nombre.trim() || !nuevoAcuario.capacidad.trim() || !nuevoAcuario.tipo.trim()) {
      setError('Por favor, complete todos los campos del formulario.');
      return;
    }

    setError(''); // Limpia errores si todo está correcto

    // Creación del nuevo objeto acuario simulando ID autoincremental
    const acuarioAgregado = {
      id: acuarios.length + 1,
      ...nuevoAcuario
    };

    // Actualización del estado con el nuevo elemento usando propagación (...)
    setAcuarios([...acuarios, acuarioAgregado]);

    // Limpiar formulario
    setNuevoAcuario({ nombre: '', capacidad: '', tipo: '' });
  };

  return (
    <div>
      {/* Componente de navegación reutilizable */}
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-primary fw-bold mb-3">🐠 Gestión de Acuarios - BettaSoft</h2>
        <p className="text-muted">Módulo desarrollado con React, useState, props y Bootstrap.</p>

        {/* Alerta de error si la validación falla */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {/* Formulario de Registro (onSubmit y onChange) */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <h4 className="card-title mb-3">Registrar Acuario</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre del Acuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nuevoAcuario.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Acuario Plantado"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacidad (Litros):</label>
                  <input
                    type="text"
                    className="form-control"
                    name="capacidad"
                    value={nuevoAcuario.capacidad}
                    onChange={handleChange}
                    placeholder="Ej. 14L"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo / Especies:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tipo"
                    value={nuevoAcuario.tipo}
                    onChange={handleChange}
                    placeholder="Ej. Betta / Guppies"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Guardar Acuario
                </button>
              </form>
            </div>
          </div>

          {/* Listado dinámico usando map() y key */}
          <div className="col-md-8">
            <div className="card shadow-sm p-3">
              <h4 className="card-title mb-3">Lista de Acuarios Registrados</h4>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Capacidad</th>
                      <th>Tipo / Especies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Método map() recorriendo el arreglo de estados */}
                    {acuarios.map((acuario) => (
                      <tr key={acuario.id}>
                        <td>{acuario.id}</td>
                        <td className="fw-bold">{acuario.nombre}</td>
                        <td>{acuario.capacidad}</td>
                        <td>{acuario.tipo}</td>
                      </tr>
                    ))}
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

export default AcuariosView;