import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>DataWeave</h3>
          <p>Design your database with ease</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Database Designer</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@dataweave.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} DataWeave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;