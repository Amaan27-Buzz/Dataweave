import React from 'react';

const TableField = ({ 
  field, 
  dataTypes, 
  isRelationSource,
  onUpdateField,
  onDeleteField,
  onRelationClick
}) => {
  return (
    <div className="table-field">
      <div className="field-content">
        <span className="field-icons">
          {field.isPrimaryKey && <span className="pk-icon" title="Primary Key">🔑</span>}
        </span>
        <input
          className="field-name"
          value={field.name}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onUpdateField({ name: e.target.value })}
        />
        <select
          className="field-type"
          value={field.type}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onUpdateField({ type: e.target.value })}
        >
          {dataTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="field-actions">
          <button 
            className={`field-relation-btn ${isRelationSource ? 'active' : ''}`}
            title={isRelationSource ? 
                  "Click on another field to complete the relation" : 
                  "Create relation from this field"}
            onClick={(e) => {
              e.stopPropagation();
              onRelationClick();
            }}
          >
            {isRelationSource ? "🔵" : "🔗"}
          </button>
          <button 
            className="field-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteField();
            }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="field-attributes">
        <label>
          <input
            type="checkbox"
            checked={field.isPrimaryKey}
            onChange={(e) => onUpdateField({ isPrimaryKey: e.target.checked })}
            onClick={(e) => e.stopPropagation()}
          />
          PK
        </label>
        <label>
          <input
            type="checkbox"
            checked={field.isNotNull}
            onChange={(e) => onUpdateField({ isNotNull: e.target.checked })}
            onClick={(e) => e.stopPropagation()}
          />
          NOT NULL
        </label>
        <label>
          <input
            type="checkbox"
            checked={field.isAutoIncrement}
            onChange={(e) => onUpdateField({ isAutoIncrement: e.target.checked })}
            onClick={(e) => e.stopPropagation()}
          />
          AUTO_INC
        </label>
      </div>
    </div>
  );
};

export default TableField;