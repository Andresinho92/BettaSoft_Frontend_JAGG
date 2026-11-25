
import React, { useState, useEffect } from 'react';

import {
  obtenerAcuarios,
  crearAcuario,
  actualizarAcuario,
  eliminarAcuario
} from '../services/api';

/**
 * Vista principal del módulo de Acuarios de BettaSoft.
 * Integración de React con API REST, Node.js y MySQL.
 */
const AcuariosView = () => {
  const [acuarios, setAcuarios] = useState([]);

  const [nuevoAcuario, setNuevoAcuario] = useState({
    nombre: '',
    capacidad: '',
    tipo: ''
  });

  const [idEdicion, setIdEdicion] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // Consultar los acuarios registrados en la base de datos
  const cargarAcuarios = async () => {
    try {
      setError('');
      const datos = await obtenerAcuarios();
      setAcuarios(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Ejecutar la consulta cuando se carga el componente
  useEffect(() => {
    cargarAcuarios();
  }, []);

  // Actualizar los campos del formulario
  const handleChange = (e) => {
    setNuevoAcuario({
      ...nuevoAcuario,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar el formulario y cancelar la edición
  const limpiarFormulario = () => {
    setNuevoAcuario({
      nombre: '',
      capacidad: '',
      tipo: ''
    });

    setIdEdicion(null);
    setError('');
    setMensaje('');
  };

  // Registrar o actualizar un acuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nuevoAcuario.nombre.trim() ||
      !nuevoAcuario.capacidad.trim() ||
      !nuevoAcuario.tipo.trim()
    ) {
      setError('Por favor, complete todos los campos del formulario.');
      setMensaje('');
      return;
    }

    const capacidad = Number(nuevoAcuario.capacidad);

    if (!Number.isFinite(capacidad) || capacidad <= 0) {
      setError('Ingrese una capacidad válida mayor que cero.');
      setMensaje('');
      return;
    }

    const datosAcuario = {
      nombre: nuevoAcuario.nombre.trim(),
      capacidad,
      tipo: nuevoAcuario.tipo.trim()
    };

    try {
      setGuardando(true);
      setError('');
      setMensaje('');

      if (idEdicion !== null) {
        await actualizarAcuario(idEdicion, datosAcuario);
        setMensaje('¡Acuario actualizado correctamente!');
      } else {
        await crearAcuario(datosAcuario);
        setMensaje('¡Acuario registrado correctamente!');
      }

      limpiarFormulario();
      await cargarAcuarios();

    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  // Cargar los datos del acuario seleccionado para editar
  const handleEditar = (acuario) => {
    setIdEdicion(acuario.id_acuario);

    setNuevoAcuario({
      nombre: acuario.nombre || '',
      capacidad: String(acuario.capacidad || ''),
      tipo: acuario.tipo || ''
    });

    setError('');
    setMensaje('');
  };

  // Eliminar un acuario mediante la API
  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      '¿Está seguro de que desea eliminar este acuario?'
    );

    if (!confirmar) {
      return;
    }

    try {
      setError('');
      setMensaje('');

      await eliminarAcuario(id);

      if (idEdicion === id) {
        limpiarFormulario();
      }

      await cargarAcuarios();

      setMensaje('¡Acuario eliminado correctamente!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold mb-3">
        Gestión de Acuarios - BettaSoft
      </h2>

      <p className="text-muted">
        Módulo integrado con React, API REST, Node.js y MySQL.
      </p>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {mensaje && (
        <div className="alert alert-success">
          {mensaje}
        </div>
      )}

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <h4 className="card-title mb-3">
              {idEdicion !== null
                ? 'Editar Acuario'
                : 'Registrar Acuario'}
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Nombre del Acuario:
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nuevoAcuario.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Acuario Plantado"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Capacidad (Litros):
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="capacidad"
                  value={nuevoAcuario.capacidad}
                  onChange={handleChange}
                  placeholder="Ej. 14"
                  min="0.01"
                  step="any"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Tipo / Especies:
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="tipo"
                  value={nuevoAcuario.tipo}
                  onChange={handleChange}
                  placeholder="Ej. Betta / Guppies"
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn ${
                  idEdicion !== null
                    ? 'btn-primary'
                    : 'btn-success'
                } w-100`}
                disabled={guardando}
              >
                {guardando
                  ? 'Procesando...'
                  : idEdicion !== null
                    ? 'Guardar Cambios'
                    : 'Guardar Acuario'}
              </button>

              {idEdicion !== null && (
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={limpiarFormulario}
                  disabled={guardando}
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm p-3">
            <h4 className="card-title mb-3">
              Lista de Acuarios Registrados
            </h4>

            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Capacidad</th>
                    <th>Tipo / Especies</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Cargando acuarios...
                      </td>
                    </tr>
                  ) : acuarios.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No hay acuarios registrados.
                      </td>
                    </tr>
                  ) : (
                    acuarios.map((acuario) => (
                      <tr key={acuario.id_acuario}>
                        <td>{acuario.id_acuario}</td>

                        <td className="fw-bold">
                          {acuario.nombre}
                        </td>

                        <td>{acuario.capacidad} L</td>

                        <td>{acuario.tipo}</td>

                        <td>
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEditar(acuario)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleEliminar(acuario.id_acuario)
                              }
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcuariosView;
