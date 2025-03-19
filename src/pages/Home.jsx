import React from 'react';
import './Pages.css';

const Home = () => {
  return (
    <div className="page home-page">
      <h1>Welcome to DataWeave</h1>
      <div className="hero-section">
        <div className="hero-content">
          <h2>Design Your Database with Ease</h2>
          <p>
            DataWeave is a powerful tool for designing and visualizing database schemas.
            Get started today and transform your data structure ideas into reality.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Intuitive Interface</h3>
            <p>Simple drag-and-drop interface for creating tables and relationships</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Collaboration</h3>
            <p>Work with your team in real-time on database designs</p>
          </div>
          <div className="feature-card">
            <h3>SQL Generation</h3>
            <p>Automatically generate SQL scripts from your designs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;