import React from 'react';
import './Footer.css';

export default function Footer() {
   return (
      <div className="footer-container">
         <div className="footer-parent">
            <img
               src={require('../../../assets/shape-bg.png').default}
               alt="noshow"
            />
         </div>
      </div>
   );
}
