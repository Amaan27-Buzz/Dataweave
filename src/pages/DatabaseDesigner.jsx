import React, { useState, useRef, useEffect } from 'react';
import './Pages.css';
import './DatabaseDesigner.css';
import Table from '../components/designer/Table';
import DesignerToolbar from '../components/designer/DesignerToolbar';
import PropertiesPanel from '../components/designer/PropertiesPanel';
import { RelationsCanvas } from '../components/designer/RelationUtils';
import EntityRelationshipDiagram from '../components/designer/EntityRelationshipDiagram';
import { generateSQL } from '../components/designer/SQLUtils';
import { DATA_TYPES } from '../components/designer/constants';

const DatabaseDesigner = () => {
  // State for tables and relationships
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [relations, setRelations] = useState([]);
  const [dragInfo, setDragInfo] = useState(null);
  const [creatingRelation, setCreatingRelation] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  /// View states
  const [showCanvas, setShowCanvas] = useState(true);
  const [showERDiagram, setShowERDiagram] = useState(false);
  
  // References
  const canvasRef = useRef(null);

  // Toggle ER Diagram
  const toggleERDiagram = () => {
    setShowERDiagram(!showERDiagram);
  };
  
  // Toggle Canvas
  const toggleCanvas = () => {
    setShowCanvas(!showCanvas);
    
    // If toggling off canvas and ER diagram is not shown, show it
    if (showCanvas && !showERDiagram) {
      setShowERDiagram(true);
    }
  };
  
  // Create a new table
  const createTable = () => {
    // Generate a unique ID
    const tableId = `table_${Date.now()}`;
    
    // Create table with default field
    const newTable = {
      id: tableId,
      name: `Table_${tables.length + 1}`,
      fields: [
        {
          id: `field_${Date.now()}_1`,
          name: 'id',
          type: 'INT',
          isPrimaryKey: true,
          isNotNull: true,
          isAutoIncrement: true
        }
      ],
      position: {
        x: 50 + (tables.length * 30) % 300,
        y: 50 + (tables.length * 30) % 300
      }
    };
    
    setTables(prevTables => [...prevTables, newTable]);
    setSelectedTable(tableId);
    
    // If we have at least one other table, suggest creating a relationship
    if (tables.length > 0) {
      setTimeout(() => {
        alert('Tip: Click the 🔗 button next to a field to create a relationship between tables');
      }, 500);
    }
  };

  // Handle mouse move for dragging and drawing relations
  const handleMouseMove = (e) => {
    // Get mouse position relative to canvas
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    // Update mouse position for relation drawing
    setMousePosition({ x, y });
    
    // Handle table dragging
    if (dragInfo) {
      setTables(tables.map(table => {
        if (table.id === dragInfo.tableId) {
          return {
            ...table,
            position: { 
              x: x - dragInfo.offsetX,
              y: y - dragInfo.offsetY
            }
          };
        }
        return table;
      }));
    }
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setDragInfo(null);
  };
  
  // Create relation between fields
  const createRelation = (sourceTableId, sourceFieldId, targetTableId, targetFieldId) => {
    // Don't allow self-relations
    if (sourceTableId === targetTableId) return;
    
    // Check if relation already exists
    const relationExists = relations.some(rel => 
      (rel.sourceTableId === sourceTableId && 
       rel.sourceFieldId === sourceFieldId &&
       rel.targetTableId === targetTableId &&
       rel.targetFieldId === targetFieldId) ||
      (rel.sourceTableId === targetTableId && 
       rel.sourceFieldId === targetFieldId &&
       rel.targetTableId === sourceTableId &&
       rel.targetFieldId === sourceFieldId)
    );
    
    if (relationExists) return;
    
    // Add the new relation
    const newRelation = {
      id: `rel_${Date.now()}`,
      sourceTableId,
      sourceFieldId,
      targetTableId,
      targetFieldId,
      relationType: 'ONE_TO_MANY'
    };
    
    setRelations(prevRelations => [...prevRelations, newRelation]);
    return newRelation;
  };

  // Start creating a relation
  const startRelation = (tableId, fieldId) => {
    setCreatingRelation({
      sourceTableId: tableId,
      sourceFieldId: fieldId
    });
  };

  // Complete a relation
  const completeRelation = (tableId, fieldId) => {
    if (!creatingRelation) return;
    
    // Create relation between source and target
    if (creatingRelation.sourceTableId && creatingRelation.sourceFieldId) {
      createRelation(
        creatingRelation.sourceTableId,
        creatingRelation.sourceFieldId,
        tableId,
        fieldId
      );
    }
    
    // Reset creating relation state
    setCreatingRelation(null);
  };
  
  // Add a field to a table
  const addField = (tableId) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          fields: [
            ...table.fields,
            {
              id: `field_${Date.now()}`,
              name: 'new_field',
              type: 'VARCHAR(255)',
              isPrimaryKey: false,
              isNotNull: false,
              isAutoIncrement: false
            }
          ]
        };
      }
      return table;
    }));
  };

  // Delete a field
  const deleteField = (tableId, fieldId) => {
    // Remove relations involving this field
    setRelations(relations.filter(rel => 
      !(rel.sourceTableId === tableId && rel.sourceFieldId === fieldId) && 
      !(rel.targetTableId === tableId && rel.targetFieldId === fieldId)
    ));
    
    // Remove the field
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          fields: table.fields.filter(field => field.id !== fieldId)
        };
      }
      return table;
    }));
  };

  // Delete a table
  const deleteTable = (tableId) => {
    // Remove relations involving this table
    setRelations(relations.filter(rel => 
      rel.sourceTableId !== tableId && rel.targetTableId !== tableId
    ));
    
    // Remove the table
    setTables(tables.filter(table => table.id !== tableId));
    
    // Update selected table if needed
    if (selectedTable === tableId) {
      setSelectedTable(null);
    }
  };

  // Export SQL
  const exportSQL = () => {
    const sql = generateSQL(tables, relations);
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.sql';
    a.click();
    
    URL.revokeObjectURL(url);
  };

  // Create example schema with relationships
  const createExampleSchema = () => {
    // Create users table
    const usersTableId = `table_${Date.now()}`;
    const usersTable = {
      id: usersTableId,
      name: 'users',
      position: { x: 50, y: 50 },
      fields: [
        {
          id: `field_${Date.now()}_1`,
          name: 'id',
          type: 'INT',
          isPrimaryKey: true,
          isNotNull: true,
          isAutoIncrement: true
        },
        {
          id: `field_${Date.now()}_2`,
          name: 'username',
          type: 'VARCHAR(255)',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        },
        {
          id: `field_${Date.now()}_3`,
          name: 'email',
          type: 'VARCHAR(255)',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        }
      ]
    };
    
    // Create posts table
    const postsTableId = `table_${Date.now() + 1}`;
    const userIdFieldId = `field_${Date.now()}_4`;
    const postsTable = {
      id: postsTableId,
      name: 'posts',
      position: { x: 350, y: 50 },
      fields: [
        {
          id: `field_${Date.now()}_5`,
          name: 'id',
          type: 'INT',
          isPrimaryKey: true,
          isNotNull: true,
          isAutoIncrement: true
        },
        {
          id: userIdFieldId,
          name: 'user_id',
          type: 'INT',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        },
        {
          id: `field_${Date.now()}_6`,
          name: 'title',
          type: 'VARCHAR(255)',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        }
      ]
    };
    
    // Create comments table
    const commentsTableId = `table_${Date.now() + 2}`;
    const postIdFieldId = `field_${Date.now()}_7`;
    const commentUserIdFieldId = `field_${Date.now()}_8`;
    const commentsTable = {
      id: commentsTableId,
      name: 'comments',
      position: { x: 350, y: 250 },
      fields: [
        {
          id: `field_${Date.now()}_9`,
          name: 'id',
          type: 'INT',
          isPrimaryKey: true,
          isNotNull: true,
          isAutoIncrement: true
        },
        {
          id: postIdFieldId,
          name: 'post_id',
          type: 'INT',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        },
        {
          id: commentUserIdFieldId,
          name: 'user_id',
          type: 'INT',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        },
        {
          id: `field_${Date.now()}_10`,
          name: 'content',
          type: 'TEXT',
          isPrimaryKey: false,
          isNotNull: true,
          isAutoIncrement: false
        }
      ]
    };
    
        // Add tables to state
    setTables([usersTable, postsTable, commentsTable]);
    
    // Create relationships between tables (after a short delay to ensure tables are rendered)
    setTimeout(() => {
      // Users to Posts relationship
      const relation1 = {
        id: `rel_${Date.now()}`,
        sourceTableId: usersTableId,
        sourceFieldId: usersTable.fields[0].id, // users.id
        targetTableId: postsTableId,
        targetFieldId: userIdFieldId, // posts.user_id
        relationType: 'ONE_TO_MANY'
      };
      
      // Users to Comments relationship
      const relation2 = {
        id: `rel_${Date.now() + 1}`,
        sourceTableId: usersTableId,
        sourceFieldId: usersTable.fields[0].id, // users.id
        targetTableId: commentsTableId,
        targetFieldId: commentUserIdFieldId, // comments.user_id
        relationType: 'ONE_TO_MANY'
      };
      
      // Posts to Comments relationship
      const relation3 = {
        id: `rel_${Date.now() + 2}`,
        sourceTableId: postsTableId,
        sourceFieldId: postsTable.fields[0].id, // posts.id
        targetTableId: commentsTableId,
        targetFieldId: postIdFieldId, // comments.post_id
        relationType: 'ONE_TO_MANY'
      };
      
      setRelations([relation1, relation2, relation3]);
    }, 100);
  };

  

  const renderMainContent = () => {
    // No view selected
    if (!showCanvas && !showERDiagram) {
      return (
        <div className="no-view-message">
          <h2>No View Selected</h2>
          <p>Please select at least one view to display:</p>
          <div className="view-buttons">
            <button onClick={() => setShowCanvas(true)}>Show Canvas</button>
            <button onClick={() => setShowERDiagram(true)}>Show ER Diagram</button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="main-content">
        {/* Canvas View */}
        {showCanvas && (
          <div 
            ref={canvasRef} 
            className="canvas schema-canvas"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {tables.length === 0 ? (
              <div className="canvas-placeholder">
                <p>Your database design canvas</p>
                <p>Click "Add Table" in the Tools panel to start</p>
                <p>Or try the "Create Example" to see a sample schema</p>
              </div>
            ) : (
              <>
                <RelationsCanvas 
                  relations={relations} 
                  tables={tables} 
                  creatingRelation={creatingRelation}
                  mousePosition={mousePosition}
                />
                
                {tables.map(table => (
                  <Table 
                    key={table.id}
                    table={table}
                    isSelected={selectedTable === table.id}
                    dataTypes={DATA_TYPES}
                    creatingRelation={creatingRelation}
                    onSelect={() => setSelectedTable(table.id)}
                    onStartDrag={(e, offsetX, offsetY) => {
                      if (creatingRelation) return;
                      setDragInfo({
                        tableId: table.id,
                        offsetX,
                        offsetY
                      });
                      setSelectedTable(table.id);
                      e.preventDefault();
                    }}
                    onDeleteTable={() => deleteTable(table.id)}
                    onUpdateField={(fieldId, updates) => {
                      setTables(tables.map(t => {
                        if (t.id === table.id) {
                          return {
                            ...t,
                            fields: t.fields.map(f => {
                              if (f.id === fieldId) {
                                return { ...f, ...updates };
                              }
                              return f;
                            })
                          };
                        }
                        return t;
                      }));
                    }}
                    onDeleteField={(fieldId) => deleteField(table.id, fieldId)}
                    onAddField={() => addField(table.id)}
                    onStartRelation={(fieldId) => startRelation(table.id, fieldId)}
                    onCompleteRelation={(fieldId) => completeRelation(table.id, fieldId)}
                  />
                ))}
              </>
            )}
          </div>
        )}
        
        {/* ER Diagram View */}
        {showERDiagram && (
          <div className="er-diagram-view">
            {tables.length === 0 ? (
              <div className="er-diagram-placeholder">
                <p>No tables to display in ER Diagram</p>
                <p>Add some tables to visualize your database structure</p>
              </div>
            ) : (
              <EntityRelationshipDiagram 
                tables={tables} 
                relations={relations} 
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page database-designer-page">
      <h1>Database Designer</h1>
      <div className="designer-container">
        <div className="sidebar">
          <DesignerToolbar 
            onAddTable={createTable}
            onToggleRelation={() => setCreatingRelation(creatingRelation ? null : {})}
            onExportSQL={exportSQL}
            onCreateExample={createExampleSchema}
            onToggleERDiagram={toggleERDiagram}
            onToggleCanvas={toggleCanvas}
            isCreatingRelation={!!creatingRelation}
            showERDiagram={showERDiagram}
            showCanvas={showCanvas}
          />
          
          <PropertiesPanel 
            selectedTable={selectedTable}
            tables={tables} 
            onUpdateTable={(updatedTable) => {
              setTables(tables.map(t => t.id === updatedTable.id ? updatedTable : t));
            }}
            onDeleteTable={deleteTable}
            onAddField={addField}
          />
        </div>
        
        {renderMainContent()}
      </div>
    </div>
  );
};

export default DatabaseDesigner;