import React from 'react';
import './ERDiagramPanel.css';

const ERDiagramPanel = ({ tables, relations, onTogglePanel }) => {
  // Skip rendering if no tables
  if (!tables.length) return null;

  return (
    <div className="er-diagram-panel">
      <div className="er-panel-header">
        <h3>Entity Relationship Diagram</h3>
        <button className="close-panel-btn" onClick={onTogglePanel}>×</button>
      </div>
      
      <div className="er-diagram-container">
        {tables.map(table => (
          <div key={table.id} className="er-table-card">
            <div className="er-table-header">
              <strong>{table.name}</strong>
            </div>
            <div className="er-table-fields">
              {table.fields.map(field => {
                // Find relationships where this field is involved
                const relationsForField = relations.filter(rel => 
                  (rel.sourceTableId === table.id && rel.sourceFieldId === field.id) || 
                  (rel.targetTableId === table.id && rel.targetFieldId === field.id)
                );
                
                return (
                  <div 
                    key={field.id} 
                    className={`er-table-field ${field.isPrimaryKey ? 'primary-key' : ''} 
                               ${relationsForField.length ? 'has-relation' : ''}`}
                  >
                    <div className="field-name-type">
                      {field.isPrimaryKey && <span className="er-key-icon">🔑</span>}
                      <span className="er-field-name">{field.name}</span>
                      <span className="er-field-type">{field.type}</span>
                    </div>
                    
                    {relationsForField.length > 0 && (
                      <div className="field-relations">
                        {relationsForField.map(relation => {
                          // Determine if this field is source or target
                          const isSource = relation.sourceTableId === table.id && relation.sourceFieldId === field.id;
                          
                          // Find the related table and field
                          const relatedTableId = isSource ? relation.targetTableId : relation.sourceTableId;
                          const relatedFieldId = isSource ? relation.targetFieldId : relation.sourceFieldId;
                          
                          const relatedTable = tables.find(t => t.id === relatedTableId);
                          const relatedField = relatedTable?.fields.find(f => f.id === relatedFieldId);
                          
                          if (!relatedTable || !relatedField) return null;
                          
                          return (
                            <div key={relation.id} className="relation-info">
                              <span className="relation-arrow">{isSource ? '→' : '←'}</span>
                              <span className="related-table">{relatedTable.name}</span>
                              <span className="related-field">({relatedField.name})</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERDiagramPanel;