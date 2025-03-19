import React, { useState, useRef, useEffect } from 'react';
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
  onCompleteRelation,
  onViewData,
  onEditTable
}) => {
  
  const [size, setSize] = useState({ width: 220, height: 'auto' });
  const resizeRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 220, height: 'auto' });
  
  const handleMouseDown = (e) => {
    if (isResizing) return;
    
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
  
  // Start resize
  const startResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
    setInitialSize({ width: size.width, height: size.height });
    
    // Add resize handlers to document
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };
  
  // Handle resize
  const handleResize = (e) => {
    if (!isResizing) return;
    
    const dx = e.clientX - resizeStart.x;
    const dy = e.clientY - resizeStart.y;
    
    setSize({
      width: Math.max(220, initialSize.width + dx),
      height: initialSize.height === 'auto' ? 'auto' : Math.max(100, initialSize.height + dy)
    });
  };
  
  // Stop resize
  const stopResize = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };
  
  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  return (
    <div
      className={`db-table ${isSelected ? 'selected' : ''}`}
      style={{
        left: table.position.x,
        top: table.position.y,
        width: size.width,
        height: size.height
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
    >
      <div className="table-header">
        <span className="table-name">{table.name}</span>
        <div className="table-actions">
          <button 
            className="table-action-btn view-btn" 
            title="View Data"
            onClick={(e) => {
              e.stopPropagation();
              onViewData(table.id);
            }}
          >
            👁️
          </button>
          <button 
            className="table-action-btn edit-btn" 
            title="Edit Table"
            onClick={(e) => {
              e.stopPropagation();
              onEditTable(table.id);
            }}
          >
            ✏️
          </button>
          <button 
            className="table-delete-btn"
            title="Delete Table"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTable();
            }}
          >
            ×
          </button>
        </div>
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
      
      {/* Resize handle */}
      <div 
        className="resize-handle"
        ref={resizeRef}
        onMouseDown={startResize}
      ></div>
    </div>
  );
};

export default Table;