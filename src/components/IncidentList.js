import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import IncidentTable from './IncidentTable';
import { getIncidents, deleteIncident } from '../api/incidentService'; // Importa la función para obtener y eliminar incidencias

// compontente incidentlist
function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [editingIncident, setEditingIncident] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterSeverity,setFilterSeverity] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const incidentsPerPage = 5; // Número de incidentes por página
  const navigate = useNavigate();
  useEffect(() => {
    getIncidents()
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'grave':
        return 'red';
      case 'leve':
        return 'pink';
      case 'alto':
        return 'orange';
      default:
        return 'white';
    }
  };

  const handleDeleteIncident = (incidentId) => {
    deleteIncident(incidentId)
      .then(() => {
        // La incidencia se eliminó correctamente, aquí puedes mostrar un mensaje o actualizar la lista de incidencias
        console.log('Incidencia eliminada correctamente');
        // Actualiza la lista de incidencias después de eliminar
        getIncidents()
          .then((response) => {
            setIncidents(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener las incidencias', error);
          });
      })
      .catch((error) => {
        console.error('Error al eliminar la incidencia', error);
      });
  };

  const handleEditIncident = (incident) => {
    setEditingIncident(incident);
    setIsEditing(true);
  navigate('/add-incident',{
  state: { incidentData: incident }, // Puedes usar la propiedad state para pasar datos
})
  };


  const filteredIncidents = incidents.filter((incident) => {
    if ((!filterSeverity || filterSeverity === '') &&(!searchTitle || searchTitle===''))
     {
      return true; // No se aplica filtro
    }
   const severityMatch = !filterSeverity || incident.severity === filterSeverity;
   const titleMatch = !searchTitle || incident.title.toLowerCase().includes(searchTitle.toLowerCase());
   return severityMatch && titleMatch;
 });
 const indexOfLastIncident = currentPage * incidentsPerPage;
const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
  
  return (
    <div className="text-center">
    <h1 className="text-xl mb-4">Lista de Incidencias</h1>
    <div className="pagination flex justify-center">
      <ul className="mb-4 pagination-list flex space-x-2">
        {Array.from({ length: Math.ceil(filteredIncidents.length / incidentsPerPage) }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${currentPage === index + 1 ? 'active' : ''}`}
              >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
      <IncidentTable
        incidents={currentIncidents}
        getSeverityColor={getSeverityColor}
        onDeleteIncident={handleDeleteIncident}
        onUpdateIncident={handleEditIncident}
        filterSeverity={filterSeverity} // Pasa el estado filterSeverity
        setFilterSeverity={setFilterSeverity} 
        searchTitle ={searchTitle} // Pasa el estado searchTitle
        setSearchTitle={setSearchTitle} // Añade setSearchTitle aquí
        />
<Link to="/add-incident" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
  Agregar Incidencia
</Link>
    </div>
  );
}

export default IncidentList;
