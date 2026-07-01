import React from "react";
import "./Footer.css"
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
   <footer className="footer">

  <div className="container">
    
    <div className="footer-top">
      
      <div className="footer-left">
        <h2>Veloure</h2>
        <p>Elevate your beauty with premium skincare & makeup.</p>
      </div>

      <div className="footer-right">
        <h2>Follow Us--</h2>
        <FaInstagram />
        <FaFacebookF />
        <FaTwitter />
      </div>

    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 Veloure. All rights reserved.</p>
  </div>

</footer>
  );
}

export default Footer;