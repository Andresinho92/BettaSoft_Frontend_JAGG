
const API_URL = '/api/acuarios';

// Función centralizada para realizar solicitudes HTTP
const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.mensaje || data.error || 'Error al comunicarse con el servidor'
    );
  }

  return data;
};

// Consultar todos los acuarios
export const obtenerAcuarios = () => {
  return request(API_URL);
};

// Consultar un acuario por su ID
export const obtenerAcuarioPorId = (id) => {
  return request(`${API_URL}/${id}`);
};

// Registrar un acuario
export const crearAcuario = (acuario) => {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(acuario)
  });
};

// Actualizar un acuario
export const actualizarAcuario = (id, acuario) => {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(acuario)
  });
};

// Eliminar un acuario
export const eliminarAcuario = (id) => {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
};
