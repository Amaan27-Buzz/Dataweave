import React, { useEffect, useRef } from 'react';

// Helper function to get a field's position
export const getFieldPosition = (tables, tableId, fieldId) => {
  const table = tables.find(t => t.id === tableId);
  if (!table) return { x: 0, y: 0 };
  
  const field = table.fields.find(f => f.id === fieldId);
  if (!field) return { x: 0, y: 0 };
  
  const fieldIdx = table.fields.indexOf(field);
  
  return {
    x: table.position.x + 220, // right side of table (assuming table width is 220px)
    y: table.position.y + 40 + fieldIdx * 30 // header (40px) + field height (30px) * index
  };
};

// Calculate position for field connector on the left side of a table
export const getFieldLeftPosition = (tables, tableId, fieldId) => {
  const table = tables.find(t => t.id === tableId);
  if (!table) return { x: 0, y: 0 };
  
  const field = table.fields.find(f => f.id === fieldId);
  if (!field) return { x: 0, y: 0 };
  
  const fieldIdx = table.fields.indexOf(field);
  
  return {
    x: table.position.x, // left side of table
    y: table.position.y + 40 + fieldIdx * 30 // header + field offset
  };
};

export const RelationLine = ({ relation, tables }) => {
  const sourceTable = tables.find(t => t.id === relation.sourceTableId);
  const targetTable = tables.find(t => t.id === relation.targetTableId);
  
  if (!sourceTable || !targetTable) return null;
  
  const sourceField = sourceTable.fields.find(f => f.id === relation.sourceFieldId);
  const targetField = targetTable.fields.find(f => f.id === relation.targetFieldId);
  
  if (!sourceField || !targetField) return null;
  
  const sourcePos = getFieldPosition(tables, relation.sourceTableId, relation.sourceFieldId);
  const targetPos = getFieldLeftPosition(tables, relation.targetTableId, relation.targetFieldId);
  
  // Control points for bezier curve - calculate based on distance
  const dx = Math.abs(targetPos.x - sourcePos.x) / 2;
  
  // Draw path with arrow using bezier curve
  const path = `M ${sourcePos.x} ${sourcePos.y} C ${sourcePos.x+dx} ${sourcePos.y}, ${targetPos.x-dx} ${targetPos.y}, ${targetPos.x} ${targetPos.y}`;
  
  return (
    <g className="relation">
      <path d={path} className="relation-line" />
      
      {/* "One" end (straight line) */}
      <line 
        x1={sourcePos.x} 
        y1={sourcePos.y-5} 
        x2={sourcePos.x} 
        y2={sourcePos.y+5} 
        className="relation-end one-end" 
      />
      
      {/* "Many" end (crow's foot) */}
      <path 
        d={`M ${targetPos.x} ${targetPos.y} L ${targetPos.x+8} ${targetPos.y-5} M ${targetPos.x} ${targetPos.y} L ${targetPos.x+8} ${targetPos.y+5}`}
        className="relation-end many-end" 
      />
    </g>
  );
};

export const RelationsCanvas = ({ relations, tables, creatingRelation, mousePosition }) => {
  return (
    <svg className="relations-layer" width="100%" height="100%">
      {/* Render existing relations */}
      {relations.map(relation => (
        <RelationLine key={relation.id} relation={relation} tables={tables} />
      ))}
      
      {/* Draw temporary line when creating relation */}
      {creatingRelation && creatingRelation.sourceTableId && creatingRelation.sourceFieldId && (
        <line 
          className="creating-relation"
          x1={getFieldPosition(tables, creatingRelation.sourceTableId, creatingRelation.sourceFieldId).x}
          y1={getFieldPosition(tables, creatingRelation.sourceTableId, creatingRelation.sourceFieldId).y}
          x2={mousePosition.x}
          y2={mousePosition.y}
          strokeDasharray="5,5"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />
      )}
    </svg>
  );
};