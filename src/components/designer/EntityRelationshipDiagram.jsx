import React, { useRef, useEffect } from 'react';
import './EntityRelationshipDiagram.css';

const EntityRelationshipDiagram = ({ tables, relations }) => {
  const canvasRef = useRef(null);
  
  // Function to draw the ER diagram
  const drawERDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set some styling constants
    const entityWidth = 120;
    const entityHeight = 80;
    const spacing = 180;
    const rows = Math.ceil(Math.sqrt(tables.length));
    const cols = Math.ceil(tables.length / rows);
    
    // Map to store entity positions
    const entityPositions = {};
    
    // Draw entities (rectangles)
    tables.forEach((table, idx) => {
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      
      const x = 100 + col * spacing;
      const y = 100 + row * spacing;
      
      // Store entity position for relationship lines
      entityPositions[table.id] = { x, y, width: entityWidth, height: entityHeight };
      
      // Draw rectangle entity
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
      
      // Draw primary key indicator (small circle at top)
      const primaryKeys = table.fields.filter(field => field.isPrimaryKey);
      if (primaryKeys.length > 0) {
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(x + entityWidth / 2, y - 10, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw relationships
    relations.forEach(relation => {
      const sourceEntity = entityPositions[relation.sourceTableId];
      const targetEntity = entityPositions[relation.targetTableId];
      
      if (!sourceEntity || !targetEntity) return;
      
      // Calculate connection points
      const source = {
        x: sourceEntity.x + sourceEntity.width / 2,
        y: sourceEntity.y + sourceEntity.height / 2
      };
      
      const target = {
        x: targetEntity.x + targetEntity.width / 2,
        y: targetEntity.y + targetEntity.height / 2
      };
      
      // Find direction vector
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize
      const nx = dx / dist;
      const ny = dy / dist;
      
      // Adjust start and end points to be on entity borders
      const sourceX = source.x + nx * (sourceEntity.width / 2);
      const sourceY = source.y + ny * (sourceEntity.height / 2);
      const targetX = target.x - nx * (targetEntity.width / 2);
      const targetY = target.y - ny * (targetEntity.height / 2);
      
      // Draw relationship line
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      
      // Draw relationship type indicator (diamond) in the middle
      const midX = (sourceX + targetX) / 2;
      const midY = (sourceY + targetY) / 2;
      
      // Draw diamond
      ctx.fillStyle = '#3498db';
      ctx.beginPath();
      ctx.moveTo(midX, midY - 10); // Top
      ctx.lineTo(midX + 10, midY); // Right
      ctx.lineTo(midX, midY + 10); // Bottom
      ctx.lineTo(midX - 10, midY); // Left
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw "crow's foot" notation at the "many" end (target)
      const footLen = 10;
      const footWidth = 6;
      
      // Calculate angle for the crow's foot
      const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
      
      // Draw the three lines of the crow's foot
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(
        targetX - footLen * Math.cos(angle) + footWidth * Math.sin(angle),
        targetY - footLen * Math.sin(angle) - footWidth * Math.cos(angle)
      );
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(
        targetX - footLen * Math.cos(angle),
        targetY - footLen * Math.sin(angle)
      );
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(
        targetX - footLen * Math.cos(angle) - footWidth * Math.sin(angle),
        targetY - footLen * Math.sin(angle) + footWidth * Math.cos(angle)
      );
      ctx.stroke();
      
      // Draw a vertical line at the "one" end (source)
      const barLen = 8;
      ctx.beginPath();
      ctx.moveTo(
        sourceX - barLen * Math.sin(angle),
        sourceY + barLen * Math.cos(angle)
      );
      ctx.lineTo(
        sourceX + barLen * Math.sin(angle),
        sourceY - barLen * Math.cos(angle)
      );
      ctx.stroke();
    });
  };
  
  // Use effect to draw diagram when component mounts or updates
  useEffect(() => {
    // Set canvas dimensions based on parent element
    const resizeCanvas = () => {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = parent.clientHeight;
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
          <span>Entity (Table)</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol relationship-diamond"></div>
          <span>Relationship</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol primary-key-circle"></div>
          <span>Primary Key</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol crows-foot"></div>
          <span>Many (N)</span>
        </div>
        <div className="legend-item">
          <div className="legend-symbol one-bar"></div>
          <span>One (1)</span>
        </div>
      </div>
    </div>
  );
};

export default EntityRelationshipDiagram;