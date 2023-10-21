import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function IncidentForm({ onSubmit, onUpdate }) {
  const location = useLocation();
  const incidentData = location.state?.incidentData; // Usa el operador de encadenamiento opcional para evitar errores si location.state no está definido

  const isUpdating = !!incidentData; // Verifica si incidentData está definido
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    user: '',
    severity: 'grave',
  });

  useEffect(() => {
    if (incidentData) {
      // Verifica si incidentData está definido
      setFormData({
        id:incidentData._id || '',
        title: incidentData.title || '',
        description: incidentData.description || '',
        user: incidentData.user || '',
        severity: incidentData.severity || 'grave',
      });
    }
  }, [incidentData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdating) {
      onUpdate(formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
             
    <form className="max-w-md mx-auto p-4 border rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">
        {isUpdating ? 'Actualizar Incidencia' : 'Agregar Incidencia'}       
        </label>
  
      </div>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2">
         Titulo
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required // Campo requerido
          className="w-full py-2 px-3 border rounded"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="user" className="block mb-2">
          Usuario
        </label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleFormChange}
          required // Campo requerido
          className="w-full py-2 px-3 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="severity" className="block mb-2">
          Severidad
        </label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          required // Campo requerido
          onChange={handleFormChange}
          className="w-full py-2 px-3 border rounded"
        >
          <option value="grave">Grave</option>
          <option value="leve">Leve</option>
          <option value="alto">Alto</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Descripción
        </label>
        <textarea
          rows={4}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          required // Campo requerido
          className="w-full py-2 px-3 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full mb-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        {isUpdating ? 'Actualizar Incidencia' : 'Agregar Incidencia'}
    </button>
      <button
        type="button" // Cambia el tipo a "button"
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Link to="/">Volver atrás</Link>
      </button>
    </form>
  );
}

export default IncidentForm;
