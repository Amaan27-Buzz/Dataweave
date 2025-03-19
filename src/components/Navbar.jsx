import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo">DataWeave</div>
        <ul className="nav-links">
          <li>
            <a 
              href="#" 
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'database-designer' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('database-designer');
              }}
            >
              Database Designer
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'about' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('about');
              }}
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;