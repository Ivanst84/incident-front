// incidentService.js

import api from './api';

// Función para obtener todas las incidencias
export const getIncidents = () => {
  return api.get('/getIncidents');
};

// Función para agregar una nueva incidencia
export const createIncident = (formData) => {
  return api.post('/createIncident', formData);
};
export const deleteIncident = (incidentId) => {
    // Construye el objeto que contiene la ID de la incidencia
    const data = {
      id: incidentId
    };
  
    return api.delete('/deleteIncident', { data });
  };

  export const updateIncident = (updatedIncidentData) => {
    console.log('Datos a actualizar:', updatedIncidentData);
  
    // Construye el objeto que contiene la ID de la incidencia y los datos actualizados
    const data = {
      ...updatedIncidentData, // Aquí deberías incluir los campos actualizados
    };
  
    
return  api.put('/updateIncident', data);  };
  
  