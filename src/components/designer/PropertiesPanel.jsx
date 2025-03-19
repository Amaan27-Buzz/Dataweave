import React from 'react';

const PropertiesPanel = ({ 
  selectedTable, 
  tables, 
  onUpdateTable, 
  onDeleteTable,
  onAddField 
}) => {
  
  const selectedTableData = tables.find(t => t.id === selectedTable);
  
  const handleRename = (name) => {
    if (selectedTableData) {
      onUpdateTable({ ...selectedTableData, name });
    }
  };

  return (
    <div className="properties-panel">
      <h3>Properties</h3>
      {selectedTable && selectedTableData ? (
        <div className="table-properties">
          <div className="form-group">
            <label>Table Name:</label>
            <input 
              type="text" 
              value={selectedTableData.name}
              onChange={(e) => handleRename(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fields:</label>
            <span>{selectedTableData.fields.length}</span>
          </div>
          <div className="form-group">
            <button 
              className="property-button add-button"
              onClick={() => onAddField(selectedTable)}
            >
              Add Field
            </button>
          </div>
          <div className="form-group">
            <button 
              className="property-button delete-button"
              onClick={() => onDeleteTable(selectedTable)}
            >
              Delete Table
            </button>
          </div>
        </div>
      ) : (
        <div className="placeholder-form">
          <p>Select a table to edit its properties</p>
          <p>or create a new table from the Tools panel</p>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;