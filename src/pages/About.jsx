import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page about-page">
      <h1>About DataWeave</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At DataWeave, our mission is to simplify database design and make it accessible to everyone.
            We believe that well-structured data is the foundation of any successful application, and we're
            committed to providing tools that make database modeling intuitive and efficient.
          </p>
        </section>
        
        <section className="about-section">
          <h2>The Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-placeholder"></div>
              <h3>Jane Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-placeholder"></div>
              <h3>John Smith</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <div className="member-placeholder"></div>
              <h3>Alex Johnson</h3>
              <p>UX Designer</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default About;