import React from 'react';

const DesignerToolbar = ({ 
  onAddTable, 
  onToggleRelation,
  onExportSQL,
  onCreateExample,
  onToggleView,
  isCreatingRelation,
  showERDiagram
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

      <h3>View</h3>
      <ul>
        <li onClick={onToggleView} className="toggle-view">
          <span className="tool-icon">{showERDiagram ? '🖌️' : '📊'}</span>
          {showERDiagram ? 'Switch to Canvas' : 'Switch to ER Diagram'}
        </li>
      </ul>
    </div>
  );
};

export default DesignerToolbar;