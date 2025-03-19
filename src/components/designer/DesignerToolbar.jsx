import React from 'react';

const DesignerToolbar = ({ 
  onAddTable, 
  onToggleRelation,
  onExportSQL,
  onCreateExample,
  onToggleERDiagram,
  onToggleCanvas,
  isCreatingRelation,
  showERDiagram,
  showCanvas
}) => {
  return (
    <div className="tools-panel">
      <h3>Tools</h3>
      <ul>
        <li onClick={onAddTable}>
          <span className="tool-icon">📋</span> Add Table
        </li>
        <li onClick={onToggleRelation}>
          <span className="tool-icon">🔗</span> Add Relation
          {isCreatingRelation && <span className="active-tool"> (Active)</span>}
        </li>
        <li onClick={onExportSQL}>
          <span className="tool-icon">📤</span> Export SQL
        </li>
        <li onClick={onCreateExample}>
          <span className="tool-icon">📚</span> Create Example
        </li>
        <li className="disabled-tool">
          <span className="tool-icon">💾</span> Save Design
        </li>
        <li className="disabled-tool">
          <span className="tool-icon">📂</span> Load Design
        </li>
      </ul>

      <h3>Views</h3>
      <ul>
        <li onClick={onToggleCanvas}>
          <span className="tool-icon">🖌️</span> Canvas
          {showCanvas && <span className="active-tool"> (Visible)</span>}
        </li>
        <li onClick={onToggleERDiagram}>
          <span className="tool-icon">📊</span> ER Diagram
          {showERDiagram && <span className="active-tool"> (Visible)</span>}
        </li>
      </ul>
    </div>
  );
};

export default DesignerToolbar;