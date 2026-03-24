import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Algocycle</h3>
            <p>
              Your trusted partner for data-driven solutions, algorithmic consulting, and technology
              services designed to accelerate business growth and innovation.
            </p>
            <div className="social-links">
              <a href="tel:+919876543210">
                <span>📞</span> Call
              </a>
              <a href="mailto:contact@algocycle.com">
                <span>📧</span> Email
              </a>
              <a
                href="https://www.linkedin.com/company/algocycle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>in</span> LinkedIn
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">HOME</a></li>
              <li><a href="#about">ABOUT US</a></li>
              <li><a href="#team">TEAM</a></li>
              <li><a href="#services">SERVICES</a></li>
              <li><a href="#careers">CAREERS</a></li>
              <li><a href="#contact">CONTACT US</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li>Algorithmic Consulting</li>
              <li>Data Analytics Solutions</li>
              <li>Software Development</li>
              <li>Machine Learning & AI</li>
              <li>Technology Advisory</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><strong>📍 Headquarters:</strong></p>
              <p>
                123, Tech Park Avenue, Innovation City,
                Bengaluru – 560001, Karnataka, India
              </p>
              <p><strong>📞 Mobile:</strong></p>
              <p>+91 98765 43210</p>
              <p><strong>📧 Email:</strong></p>
              <p>contact@algocycle.com</p>
              <p><strong>🌐 Website:</strong></p>
              <p>www.algocycle.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Algocycle. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;