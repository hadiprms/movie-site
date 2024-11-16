import React, { useState, useEffect } from 'react';  
import './cssFiles/footer.css';  
import Skeleton from 'react-loading-skeleton';  
import 'react-loading-skeleton/dist/skeleton.css';  

const Footer = () => {  
  const [loading, setLoading] = useState(true); // State to manage loading status  

  // Simulate loading with a delay  
  useEffect(() => {  
    const timer = setTimeout(() => {  
      setLoading(false); // Set loading to false after 2 seconds  
    }, 2000); // Adjust the duration as needed  

    return () => clearTimeout(timer); // Cleanup timer on unmount  
  }, []);  

  return (  
    <footer className="footer">  
      <div className="footer-links">  
        {loading ? ( // Conditional rendering based on loading state  
          <>  
            <Skeleton width={2000} />  
            <span></span>  
            <Skeleton width={2000} />  
          </>  
        ) : (  
          <>  
            <a href="/rules" className="footer-link">Rules</a>  
            <span>|</span>  
            <a href="/contact" className="footer-link">Contact Us</a>  
          </>  
        )}  
      </div>  
      <p className="footer-text">  
        {loading ? <Skeleton width={200} /> : '© 2024 Best Movies. All rights reserved.'}  
      </p>  
    </footer>  
  );  
};  

export default Footer;