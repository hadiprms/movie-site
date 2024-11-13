import React from 'react';  
import './cssFiles/footer.css'; // Optional: Import a CSS file for styling  

const Footer = () => {  
  return (  
    <footer className="footer">  
      <div className="footer-links">  
        <a href="/rules" className="footer-link">Rules</a>  
        <span>|</span>  
        <a href="/contact" className="footer-link">Contact Us</a>  
      </div>  
      <p className="footer-text">© 2024 Best Movies. All rights reserved.</p>  
    </footer>  
  );  
}  

export default Footer;