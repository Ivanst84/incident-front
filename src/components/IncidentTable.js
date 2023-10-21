import { useState } from 'react';


//compontente incident table
function IncidentTable({incidents, onDeleteIncident,getSeverityColor,onUpdateIncident,
   filterSeverity, setFilterSeverity,setSearchTitle,searchTitle}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };
  const handleTitleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };
  
  
  const handleSeverityFilterChange = (e) => {
    setFilterSeverity(e.target.value);
  };


  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border p-4 rounded-md shadow-md mb-4 flex justify-center items-center">
        <div className="flex-grow">
          <label htmlFor="severityFilter">Filtrar por severidad:</label>
          <select
            id="severityFilter"
            name="severityFilter"
            value={filterSeverity}
            onChange={handleSeverityFilterChange}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Todas</option>
            <option value="grave">Grave</option>
            <option value="leve">Leve</option>
            <option value="alto">Alto</option>
          </select>
        </div>
        <div className="border-r mx-4 h-8"></div> {/* Línea divisoria */}
        <div className="flex-grow">
          <label htmlFor="titleFilter">Buscar por título:</label>
          <input
            type="text"
            id="titleFilter"
            value={searchTitle}
            onChange={handleTitleSearchChange}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex justify-center"> {/* Contenedor centrado */}


      <table className="min-w-full divide-y divide-gray-200 ml-0">

        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Severidad
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incidents.map((incident) => (
            <tr key={incident._id}>
              <td className="px-4 py-2 whitespace-nowrap">{incident.title}</td>
              <td
                className={`px-4 py-2 whitespace-nowrap cursor-pointer text-blue-500 ${
                  expandedRow === incident._id ? 'text-gray-600' : ''
                }`}
                onClick={() => toggleRow(incident._id)}
              >
                {expandedRow === incident._id ? incident.description : `${incident.description.substring(0, 10)}...`}
              </td>
              <td
                className={`px-4 py-2 whitespace-nowrap cursor-pointer text-blue-500 ${
                  expandedRow === incident._id ? 'text-gray-600' : ''
                }`}
                onClick={() => toggleRow(incident._id)}
              >
                {expandedRow === incident._id ? incident.user : incident.user}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`inline-block rounded-full px-2 font-semibold text-sm text-white ${getSeverityColor(
                    incident.severity
                  )}`}
                  style={{ backgroundColor: getSeverityColor(incident.severity) }}
                >
                  {incident.severity}
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
              <button
  onClick={() => {
    const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta incidencia?');
    if (shouldDelete) {
      onDeleteIncident(incident._id);
    }
  }}
  className="bg-red-500 text-white px-5 py-2 rounded-md
   hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 mx-5"
>
  Eliminar
</button>

<button
  onClick={() => {
    const shouldUpdate = window.confirm('¿Estás seguro de que deseas modificar esta incidencia?');
    if (shouldUpdate) {
      onUpdateIncident(incident);
    }
  }}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
  focus:outline-none focus:ring focus:ring-blue-300 mx-5"
>
  Editar
</button>
                              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
}

export default IncidentTable;
