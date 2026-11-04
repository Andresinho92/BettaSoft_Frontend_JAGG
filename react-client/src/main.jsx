import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importación de Bootstrap para que toda la interfaz tenga diseño profesional
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)