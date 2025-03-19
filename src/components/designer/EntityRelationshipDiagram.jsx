import React, { useRef, useEffect } from 'react';
import './EntityRelationshipDiagram.css';

const EntityRelationshipDiagram = ({ tables, relations }) => {
  const canvasRef = useRef(null);
  
  // Function to draw the ER diagram in Chen notation
  const drawERDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set styling constants
    const entityWidth = 120;
    const entityHeight = 60;
    const attributeRadius = 35;
    const relationshipWidth = 100;
    const relationshipHeight = 60;
    const spacing = 300; // Increased spacing for better visualization
    const rows = Math.ceil(Math.sqrt(tables.length));
    const cols = Math.ceil(tables.length / rows);
    
    // Map to store entity positions
    const entityPositions = {};
    const relationshipPositions = {};
    
    // Draw entities (rectangles)
    tables.forEach((table, idx) => {
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      
      const x = 150 + col * spacing;
      const y = 150 + row * spacing;
      
      // Store entity position
      entityPositions[table.id] = { 
        x: x + entityWidth / 2, 
        y: y + entityHeight / 2,
        width: entityWidth, 
        height: entityHeight,
        fields: table.fields
      };
      
      // Draw rectangle entity (table)
      ctx.fillStyle = '#f5f5f5';
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.rect(x, y, entityWidth, entityHeight);
      ctx.fill();
      ctx.stroke();
      
      // Draw entity name
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(table.name, x + entityWidth / 2, y + entityHeight / 2);
      
      // Draw attributes (ovals)
      const attributeCount = table.fields.length;
      const attributeAngleStep = (Math.PI * 2) / Math.max(attributeCount, 1);
      const attributeDistanceFromEntity = 80;
      
      table.fields.forEach((field, fieldIdx) => {
        // Calculate attribute position in a circular pattern around the entity
        const angle = attributeAngleStep * fieldIdx - Math.PI / 2;
        const attrX = x + entityWidth / 2 + Math.cos(angle) * attributeDistanceFromEntity;
        const attrY = y + entityHeight / 2 + Math.sin(angle) * attributeDistanceFromEntity;
        
        // Draw oval for attribute
        ctx.beginPath();
        ctx.save();
        ctx.translate(attrX, attrY);
        ctx.scale(1, 0.7); // Make it oval-shaped
        
        // Primary key attributes have a different style
        if (field.isPrimaryKey) {
          ctx.fillStyle = '#fffacd'; // Light yellow
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          // Draw underline for primary key
          ctx.beginPath();
          ctx.arc(0, 0, attributeRadius / 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = '#e6f7ff'; // Light blue
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, attributeRadius / 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
        
        // Draw attribute name
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(field.name, attrX, attrY);
        
        // Store attribute position for relationships
        if (!entityPositions[table.id].attributePositions) {
          entityPositions[table.id].attributePositions = {};
        }
        entityPositions[table.id].attributePositions[field.id] = {
          x: attrX,
          y: attrY
        };
      });
    });
    
    // Draw relationships (diamonds)
    relations.forEach((relation, idx) => {
      const sourceEntity = entityPositions[relation.sourceTableId];
      const targetEntity = entityPositions[relation.targetTableId];
      
      if (!sourceEntity || !targetEntity) return;
      
      // Calculate relationship position (midpoint between entities)
      const relX = (sourceEntity.x + targetEntity.x) / 2;
      const relY = (sourceEntity.y + targetEntity.y) / 2;
      
      // Store relationship position
      relationshipPositions[relation.id] = {
        x: relX,
        y: relY,
        width: relationshipWidth,
        height: relationshipHeight
      };
      
      // Draw diamond for relationship
      ctx.fillStyle = '#f0f8ff'; // Light blue
      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(relX, relY - relationshipHeight / 2); // Top point
      ctx.lineTo(relX + relationshipWidth / 2, relY); // Right point
      ctx.lineTo(relX, relY + relationshipHeight / 2); // Bottom point
      ctx.lineTo(relX - relationshipWidth / 2, relY); // Left point
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw relationship name
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(relation.name || 'has', relX, relY);
      
      // Draw lines connecting entities to relationship
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1.5;
      
      // Line from source entity to relationship
      ctx.beginPath();
      ctx.moveTo(sourceEntity.x, sourceEntity.y);
      ctx.lineTo(relX, relY);
      ctx.stroke();
      
      // Line from relationship to target entity
      ctx.beginPath();
      ctx.moveTo(relX, relY);
      ctx.lineTo(targetEntity.x, targetEntity.y);
      ctx.stroke();
      
      // Draw cardinality (1:N relationship)
      // Source side (1)
      const sourceAngle = Math.atan2(relY - sourceEntity.y, relX - sourceEntity.x);
      const sourceDistance = 25;
      const sourceCardX = sourceEntity.x + Math.cos(sourceAngle) * sourceDistance;
      const sourceCardY = sourceEntity.y + Math.sin(sourceAngle) * sourceDistance;
      
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('1', sourceCardX, sourceCardY);
      
      // Target side (N)
      const targetAngle = Math.atan2(targetEntity.y - relY, targetEntity.x - relX);
      const targetDistance = 25;
      const targetCardX = targetEntity.x - Math.cos(targetAngle) * targetDistance;
      const targetCardY = targetEntity.y - Math.sin(targetAngle) * targetDistance;
      
      ctx.fillText('N', targetCardX, targetCardY);
    });
  };
  
  // Use effect to draw diagram when component mounts or updates
  useEffect(() => {
    // Set canvas dimensions based on parent element
    const resizeCanvas = () => {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = Math.max(800, parent.clientHeight);
        drawERDiagram();
      }
    };
    
    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [tables, relations]);
  
  return (
    <div className="er-diagram-container">
      <h3 className="er-diagram-title">Entity Relationship Diagram</h3>
      <div className="er-diagram-canvas-container">
        <canvas ref={canvasRef} className="er-diagram-canvas"></canvas>
      </div>
      <div className="er-diagram-legend">
        <div className="legend-item">
          <div className="legend-symbol entity-rectangle"></div>
          <span>Entity</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol attribute-oval"></div>
          <span>Attribute</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol key-attribute-oval"></div>
          <span>Key Attribute</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol relationship-diamond"></div>
          <span>Relationship</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol cardinality-one"></div>
          <span>One (1)</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol cardinality-many"></div>
          <span>Many (N)</span>
        </div>
      </div>
    </div>
  );
};

export default EntityRelationshipDiagram;