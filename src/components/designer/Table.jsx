import React from 'react';
import TableField from './TableField';

const Table = ({ 
  table, 
  isSelected, 
  dataTypes,
  creatingRelation,
  onSelect,
  onStartDrag,
  onDeleteTable,
  onUpdateField,
  onDeleteField,
  onAddField,
  onStartRelation,
  onCompleteRelation
}) => {
  
  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    onStartDrag(e, offsetX, offsetY);
  };

  const isRelationSource = (fieldId) => {
    return creatingRelation && 
           creatingRelation.sourceTableId === table.id && 
           creatingRelation.sourceFieldId === fieldId;
  };

  const handleRelationClick = (fieldId) => {
    if (creatingRelation && creatingRelation.sourceTableId) {
      // If we're already creating a relation, complete it
      onCompleteRelation(fieldId);
    } else {
      // Otherwise, start a new relation
      onStartRelation(fieldId);
    }
  };

  return (
    <div
      className={`db-table ${isSelected ? 'selected' : ''}`}
      style={{
        left: table.position.x,
        top: table.position.y
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
    >
      <div className="table-header">
        <span className="table-name">{table.name}</span>
        <button 
          className="table-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTable();
          }}
        >
          ×
        </button>
      </div>
      
      <div className="table-body">
        {table.fields.map(field => (
          <TableField
            key={field.id}
            field={field}
            tableId={table.id}
            dataTypes={dataTypes}
            isRelationSource={isRelationSource(field.id)}
            onUpdateField={(updates) => onUpdateField(field.id, updates)}
            onDeleteField={() => onDeleteField(field.id)}
            onRelationClick={() => handleRelationClick(field.id)}
          />
        ))}
      </div>
      
      <div className="table-footer">
        <button 
          className="add-field-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddField();
          }}
        >
          + Add Field
        </button>
      </div>
    </div>
  );
};

export default Table;