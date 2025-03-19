import React, { useState } from 'react';

const ViewDataModal = ({ table, tableData, onClose, onSaveData }) => {
  const [data, setData] = useState(tableData || []);
  const [newRow, setNewRow] = useState({});
  
  // Initialize new row with empty values for all fields
  const initializeNewRow = () => {
    const emptyRow = {};
    table.fields.forEach(field => {
      emptyRow[field.id] = '';
    });
    return emptyRow;
  };
  
  // Reset new row to empty values
  const resetNewRow = () => {
    setNewRow(initializeNewRow());
  };
  
  // Handle changes to the new row form
  const handleNewRowChange = (fieldId, value) => {
    setNewRow({
      ...newRow,
      [fieldId]: value
    });
  };
  
  // Add the new row to the data
  const addRow = () => {
    setData([...data, { id: `row_${Date.now()}`, ...newRow }]);
    resetNewRow();
  };
  
  // Handle import from CSV
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      
      if (lines.length > 0) {
        // Parse header line to get field names
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Create a mapping from CSV headers to field IDs
        const fieldMapping = {};
        table.fields.forEach(field => {
          const headerIndex = headers.findIndex(h => h.toLowerCase() === field.name.toLowerCase());
          if (headerIndex >= 0) {
            fieldMapping[headerIndex] = field.id;
          }
        });
        
        // Parse data rows
        const importedData = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(v => v.trim());
          const rowData = { id: `imported_${Date.now()}_${i}` };
          
          Object.entries(fieldMapping).forEach(([headerIndex, fieldId]) => {
            rowData[fieldId] = values[headerIndex] || '';
          });
          
          importedData.push(rowData);
        }
        
        setData([...data, ...importedData]);
      }
    };
    
    reader.readAsText(file);
  };
  
  // Handle import from Excel (simplified for this example)
  const handleImportExcel = (e) => {
    alert('Excel import would be implemented here. For this example, we\'ll use CSV import only.');
  };
  
  // Initialize new row when component mounts
  React.useEffect(() => {
    resetNewRow();
  }, [table]);
  
  return (
    <div className="table-modal-overlay" onClick={onClose}>
      <div className="table-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">View Data: {table.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="data-viewer">
            <div className="data-import-buttons">
              <label className="data-import-button">
                <input 
                  type="file" 
                  accept=".csv" 
                  style={{ display: 'none' }} 
                  onChange={handleImportCSV}
                />
                <span>📥 Import CSV</span>
              </label>
              <label className="data-import-button">
                <input 
                  type="file" 
                  accept=".xlsx,.xls" 
                  style={{ display: 'none' }} 
                  onChange={handleImportExcel}
                />
                <span>📊 Import Excel</span>
              </label>
            </div>
            
            {/* Table with existing data */}
            <table className="data-table">
              <thead>
                <tr>
                  {table.fields.map(field => (
                    <th key={field.id}>{field.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id}>
                    {table.fields.map(field => (
                      <td key={`${row.id}_${field.id}`}>{row[field.id]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Form for adding new data */}
            <div className="add-data-section">
              <h3>Add New Row</h3>
              <div className="data-entry-row">
                {table.fields.map(field => (
                  <div key={field.id} className="data-entry-cell">
                    <label>{field.name}</label>
                    <input 
                      type="text"
                      value={newRow[field.id] || ''}
                      onChange={e => handleNewRowChange(field.id, e.target.value)}
                      placeholder={field.type}
                    />
                  </div>
                ))}
              </div>
              <button className="add-data-row-btn" onClick={addRow}>
                Add Row
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button secondary-button" onClick={onClose}>Close</button>
          <button 
            className="modal-button primary-button" 
            onClick={() => {
              onSaveData(data);
              onClose();
            }}
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDataModal;