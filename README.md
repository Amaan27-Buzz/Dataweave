# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# DataWeave

DataWeave is a React + Vite project designed to provide a database schema designer similar to dbdiagram.io. It allows users to create tables, define relationships, and visualize the schema using an Entity-Relationship (ER) diagram.

## Features

- **Database Schema Design**: Create tables, define fields, and set primary keys.
- **Relationship Mapping**: Define relationships between tables and visualize them.
- **ER Diagram**: Visualize the schema using traditional ER notation (circles, triangles, rectangles).
- **Export SQL**: Generate SQL scripts for the designed schema.
- **Example Schema**: Load an example schema to quickly see the tool's capabilities.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/DataWeave.git
    cd DataWeave
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
DataWeave/
├── public/
│   ├── index.html                  # HTML template for the app
│   └── favicon.ico                 # Favicon for the app
├── src/
│   ├── assets/                     # Static assets like images, icons
│   ├── components/                 # Reusable React components
│   │   ├── designer/               # Components specific to the schema designer
│   │   │   ├── Table.jsx           # Component for rendering a table
│   │   │   ├── DesignerToolbar.jsx # Toolbar for schema designer actions
│   │   │   ├── PropertiesPanel.jsx # Panel for table properties
│   │   │   ├── ERDiagramPanel.jsx  # Panel for displaying ER diagram
│   │   │   ├── EntityRelationshipDiagram.jsx # Component for rendering ER diagrams
│   │   │   ├── RelationUtils.jsx   # Utility functions for handling relationships
│   │   │   ├── SQLUtils.jsx        # Utility functions for generating SQL
│   │   │   └── constants.js        # Constants used in the schema designer
│   ├── pages/                      # Page-level components
│   │   ├── DatabaseDesigner.jsx    # Main page component for the database designer
│   ├── styles/                     # Global and component-specific styles
│   │   ├── Pages.css               # Styles for page-level components
│   │   ├── DatabaseDesigner.css    # Styles for the database designer page
│   │   ├── ERDiagramPanel.css      # Styles for the ER diagram panel
│   │   ├── EntityRelationshipDiagram.css # Styles for the ER diagram component
│   ├── App.jsx                     # Main app component
│   ├── index.jsx                   # Entry point for the React app
│   └── main.jsx                    # Main entry file for Vite
├── .gitignore                      # Git ignore file
├── package.json                    # NPM package configuration
└── README.md                       # Project documentation
```

### Description of Key Files and Folders

- **public/**: Contains the HTML template and favicon for the app.
- **src/**: Main source code directory.
  - **assets/**: Contains static assets like images and icons.
  - **components/**: Contains reusable React components.
    - **designer/**: Contains components specific to the schema designer.
      - **Table.jsx**: Component for rendering a table.
      - **DesignerToolbar.jsx**: Toolbar for schema designer actions.
      - **PropertiesPanel.jsx**: Panel for displaying and editing table properties.
      - **ERDiagramPanel.jsx**: Panel for displaying the ER diagram.
      - **EntityRelationshipDiagram.jsx**: Component for rendering the ER diagram using traditional notation.
      - **RelationUtils.jsx**: Utility functions for handling relationships between tables.
      - **SQLUtils.jsx**: Utility functions for generating SQL scripts from the schema.
      - **constants.js**: Contains constants used across the schema designer components.
  - **pages/**: Contains page-level components.
    - **DatabaseDesigner.jsx**: Main page component for the database designer.
  - **styles/**: Contains global and component-specific styles.
    - **Pages.css**: Styles for page-level components.
    - **DatabaseDesigner.css**: Styles for the database designer page.
    - **ERDiagramPanel.css**: Styles for the ER diagram panel.
    - **EntityRelationshipDiagram.css**: Styles for the ER diagram component.
  - **App.jsx**: Main app component that sets up the routing and layout.
  - **index.jsx**: Entry point for the React app.
  - **main.jsx**: Main entry file for Vite.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: NPM package configuration file.
- **README.md**: Project documentation.

## Usage

### Adding Tables

1. Click the "Add Table" button in the toolbar.
2. A new table will be added to the canvas. You can drag it to reposition.
3. Click on the table to edit its properties in the properties panel.

### Adding Relationships

1. Click the "Add Relation" button in the toolbar.
2. Click on the source field (usually a primary key) in one table.
3. Click on the target field (usually a foreign key) in another table.
4. A relationship line will be drawn between the tables.

### Toggle Views

- **Canvas**: Click the "Canvas" button in the toolbar to show or hide the canvas view.
- **ER Diagram**: Click the "ER Diagram" button in the toolbar to show or hide the ER diagram view.

### Export SQL

1. Click the "Export SQL" button in the toolbar.
2. A SQL script for the current schema will be generated and downloaded.

### Example Schema

1. Click the "Create Example" button in the toolbar to load an example schema.
2. This will add example tables and relationships to the canvas and ER diagram.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.