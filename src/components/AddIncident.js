import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncidentForm from "../pages/IncidentForm";
import Notification from "./Notification";
import { createIncident,updateIncident} from '../api/incidentService'; // Importa la función para obtener las incidencias
function AddIncident() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  const handleUpdate = (formData) => {
    // Llama a la función de actualización con los datos actualizados
    updateIncident(formData)
      .then((response) => {
        setNotification({
          open: true,
          message: "Incidencia actualizada correctamente",
          severity: "success",
        });
    
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
    
    
      .catch((error) => {
        setNotification({
          open: true,
          message: "Error al actualizar la incidencia",
          severity: "error",
        });
      });
  };

  const handleFormSubmit = (formData) => {
    console.log('formData:', formData); // Agrega este mensaje de consola
    createIncident(formData)
      .then((response) => {
        setNotification({
          open: true,
          message: "Incidencia agregada correctamente",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: "Error al agregar la incidencia",
          severity: "error",
        });

        navigate("/");
      });
  };

  return (
    <div>
      <IncidentForm onSubmit={handleFormSubmit} onUpdate={handleUpdate} />

      <Notification
        open={notification.open}
        onClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
      />
    </div>
  );
}

export default AddIncident;