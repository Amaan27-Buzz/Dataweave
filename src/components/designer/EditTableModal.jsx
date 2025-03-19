import React, { useState } from 'react';

const EditTableModal = ({ table, tables, relations, dataTypes, onClose, onSave }) => {
  const [editedTable, setEditedTable] = useState({...table});
  
  const handleNameChange = (e) => {
    setEditedTable({...editedTable, name: e.target.value});
  };
  
  const handleFieldChange = (fieldId, property, value) => {
    setEditedTable({
      ...editedTable,
      fields: editedTable.fields.map(field => 
        field.id === fieldId ? { ...field, [property]: value } : field
      )
    });
  };
  
  const addField = () => {
    setEditedTable({
      ...editedTable,
      fields: [
        ...editedTable.fields,
        {
          id: `field_${Date.now()}`,
          name: 'new_field',
          type: 'VARCHAR(255)',
          isPrimaryKey: false,
          isNotNull: false,
          isAutoIncrement: false
        }
      ]
    });
  };
  
  const deleteField = (fieldId) => {
    setEditedTable({
      ...editedTable,
      fields: editedTable.fields.filter(field => field.id !== fieldId)
    });
  };
  
  // Get related tables for dropdown
  const getOtherTables = () => {
    return tables.filter(t => t.id !== table.id);
  };
  
  return (
    <div className="table-modal-overlay" onClick={onClose}>
      <div className="table-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Table</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="table-editor">
            <input 
              type="text" 
              className="table-name-input" 
              value={editedTable.name} 
              onChange={handleNameChange} 
              placeholder="Table Name"
            />
            
            <div className="table-fields-editor">
              <div className="field-row header">
                <div className="field-cell">Name</div>
                <div className="field-cell">Type</div>
                <div className="field-cell">Primary Key</div>
                <div className="field-cell">Not Null</div>
                <div className="field-cell">Auto Inc</div>
                <div className="field-cell">Relation</div>
                <div className="field-cell"></div>
              </div>
              
              {editedTable.fields.map(field => (
                <div key={field.id} className="field-row">
                  <div className="field-cell">
                    <input 
                      type="text" 
                      value={field.name} 
                      onChange={e => handleFieldChange(field.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="field-cell">
                    <select 
                      value={field.type} 
                      onChange={e => handleFieldChange(field.id, 'type', e.target.value)}
                    >
                      {dataTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field-cell">
                    <input 
                      type="checkbox" 
                      checked={field.isPrimaryKey} 
                      onChange={e => handleFieldChange(field.id, 'isPrimaryKey', e.target.checked)}
                    />
                  </div>
                  <div className="field-cell">
                    <input 
                      type="checkbox" 
                      checked={field.isNotNull} 
                      onChange={e => handleFieldChange(field.id, 'isNotNull', e.target.checked)}
                    />
                  </div>
                  <div className="field-cell">
                    <input 
                      type="checkbox" 
                      checked={field.isAutoIncrement} 
                      onChange={e => handleFieldChange(field.id, 'isAutoIncrement', e.target.checked)}
                    />
                  </div>
                  <div className="field-cell">
                    <select 
                      className="relation-select"
                      value=""
                      onChange={e => {
                        if (e.target.value) {
                          const [targetTableId, targetFieldId] = e.target.value.split('|');
                          // Here you would add a relation, but we're just displaying the dropdown
                        }
                      }}
                    >
                      <option value="">No relation</option>
                      {getOtherTables().map(targetTable => 
                        targetTable.fields.map(targetField => (
                          <option key={`${targetTable.id}|${targetField.id}`} value={`${targetTable.id}|${targetField.id}`}>
                            {targetTable.name}.{targetField.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="field-cell">
                    <button 
                      className="delete-field-btn"
                      onClick={() => deleteField(field.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="add-field-row">
                <button 
                  className="add-field-btn"
                  onClick={addField}
                >
                  + Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button secondary-button" onClick={onClose}>Cancel</button>
          <button 
            className="modal-button primary-button" 
            onClick={() => {
              onSave(editedTable);
              onClose();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTableModal;