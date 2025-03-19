import React from 'react';
import './ERDiagramPanel.css';

const ERDiagramPanel = ({ tables, relations, onTogglePanel }) => {
  // Skip rendering if no tables
  if (!tables.length) return null;

  // Function to get relation name
  const getRelationName = (relationId) => {
    const relation = relations.find(rel => rel.id === relationId);
    return relation?.name || 'has';
  };

  return (
    <div className="er-diagram-panel">
      <div className="er-panel-header">
        <h3>Entity Relationship Model</h3>
        <button className="close-panel-btn" onClick={onTogglePanel}>×</button>
      </div>
      
      <div className="er-diagram-container">
        <div className="er-panel-section">
          <h4 className="er-panel-section-title">Entities</h4>
          {tables.map(table => (
            <div key={table.id} className="er-table-card">
              <div className="er-table-header">
                <strong>{table.name}</strong>
              </div>
              <div className="er-table-attrs">
                <h5 className="er-attr-section-title">Attributes</h5>
                {table.fields.map(field => (
                  <div 
                    key={field.id} 
                    className={`er-table-attr ${field.isPrimaryKey ? 'primary-key' : ''}`}
                  >
                    <div className="attr-name-type">
                      {field.isPrimaryKey && <span className="er-key-icon">🔑</span>}
                      <span className="er-attr-name">{field.name}</span>
                      <span className="er-attr-type">{field.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="er-panel-section">
          <h4 className="er-panel-section-title">Relationships</h4>
          {relations.map(relation => {
            const sourceTable = tables.find(t => t.id === relation.sourceTableId);
            const targetTable = tables.find(t => t.id === relation.targetTableId);
            const sourceField = sourceTable?.fields.find(f => f.id === relation.sourceFieldId);
            const targetField = targetTable?.fields.find(f => f.id === relation.targetFieldId);
            
            if (!sourceTable || !targetTable || !sourceField || !targetField) return null;
            
            return (
              <div key={relation.id} className="er-relation-card">
                <div className="er-relation-header">
                  <strong>{relation.name || 'has'}</strong>
                </div>
                <div className="er-relation-details">
                  <div className="er-relation-entity">
                    <span className="er-entity-name">{sourceTable.name}</span>
                    <span className="er-cardinality">1</span>
                  </div>
                  <div className="er-relation-connector">
                    <span className="er-connector-line">—</span>
                  </div>
                  <div className="er-relation-entity">
                    <span className="er-cardinality">N</span>
                    <span className="er-entity-name">{targetTable.name}</span>
                  </div>
                </div>
                <div className="er-relation-attributes">
                  <div className="er-relation-attr">
                    <span className="er-attr-label">Source:</span>
                    <span className="er-attr-value">{sourceField.name}</span>
                  </div>
                  <div className="er-relation-attr">
                    <span className="er-attr-label">Target:</span>
                    <span className="er-attr-value">{targetField.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ERDiagramPanel;