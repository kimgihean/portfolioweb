import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-logo">Gihyun Kim</h3>
          <p className="footer-desc">Backend | AI Service | Web Developer</p>
        </div>
        
        <div className="footer-links">
          <a href="https://github.com/kimgihean" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="mailto:rlgus2738@naver.com"  className="footer-link">Email</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gihyun Kim. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
