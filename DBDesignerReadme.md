# Database Designer Page

The Database Designer page is a core feature of the DataWeave application. It provides users with an intuitive interface to design and visualize their database schemas. This document provides a detailed overview of the features available on the Database Designer page.

## Features

### 1. Table Management

#### Adding Tables
- Click the "Add Table" button in the toolbar to create a new table.
- A new table will be added to the canvas. You can drag it to reposition.
- Click on the table to edit its properties in the properties panel.

#### Editing Tables
- Select a table by clicking on it.
- Use the properties panel to update the table's name and fields.
- Fields can be marked as primary keys, not null, and auto-increment.

#### Deleting Tables
- Select the table you wish to delete.
- Use the delete option in the properties panel to remove the table from the canvas.

### 2. Field Management

#### Adding Fields
- Select a table to enable the properties panel.
- Click the "Add Field" button to add a new field to the selected table.
- Update the field's properties such as name, type, and constraints.

#### Editing Fields
- Click on a field within a table to edit its properties.
- Use the properties panel to update field details.

#### Deleting Fields
- Select the field you wish to delete.
- Use the delete option in the properties panel to remove the field from the table.

### 3. Relationship Management

#### Adding Relationships
- Click the "Add Relation" button in the toolbar.
- Click on the source field (usually a primary key) in one table.
- Click on the target field (usually a foreign key) in another table.
- A relationship line will be drawn between the tables.

#### Visualizing Relationships
- Relationships are visually represented with lines connecting the related fields.
- The lines will have a straight line (|) at the "one" side (source) and a crow's foot (< or >) at the "many" side (target).

### 4. ER Diagram

#### Viewing the ER Diagram
- Click the "ER Diagram" button in the toolbar to toggle the ER Diagram view.
- The ER Diagram uses traditional notation (circles, triangles, rectangles) to represent the schema.

#### ER Diagram Notation
- **Entities (Tables)**: Represented as rectangles.
- **Primary Keys**: Indicated with red circles.
- **Relationships**: Shown with diamonds.
- **Crow's Foot Notation**: Used for one-to-many relationships.

### 5. Layout Management

#### Toggling Views
- **Canvas View**: Click the "Canvas" button in the toolbar to show or hide the canvas view.
- **ER Diagram View**: Click the "ER Diagram" button in the toolbar to show or hide the ER diagram view.

#### Layout Behavior
- When both canvas and ER diagram views are shown, they display side by side.
- When only one view is shown, it takes the full width of the main content area.
- If neither view is shown, a message appears with buttons to enable views.

### 6. Exporting SQL

#### Exporting Schema to SQL
- Click the "Export SQL" button in the toolbar.
- A SQL script for the current schema will be generated and downloaded.

### 7. Example Schema

#### Loading an Example Schema
- Click the "Create Example" button in the toolbar to load an example schema.
- This will add example tables and relationships to the canvas and ER diagram.

## User Interface Components

### Toolbar
- Contains buttons for adding tables, creating relationships, exporting SQL, loading example schema, and toggling views.

### Canvas
- Main area where tables and relationships are visually represented.
- Allows for drag-and-drop positioning of tables.

### Properties Panel
- Side panel for editing properties of the selected table or field.
- Displays options for updating table name, adding/deleting fields, and modifying field properties.

### ER Diagram Panel
- Displays the ER diagram using traditional notation.
- Can be toggled on/off using the toolbar.

### Messages and Placeholders
- Displayed when no view is selected or when there are no tables to show.
- Provide guidance and options to the user for enabling views and adding tables.

## Conclusion

The Database Designer page provides a comprehensive set of tools for designing and visualizing database schemas. With features for managing tables, fields, relationships, and exporting SQL, it offers a powerful and user-friendly interface for database design.