import React from "react";
import "./contact-us.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const whatsappLink = process.env.REACT_APP_WHATSAPP_LINK;
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Reach out to us on Instagram or WhatsApp.
      </p>
      <div className="contact-icons">
        <a
          href="https://www.instagram.com/sweetlyfitbyelissar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="contact-icon instagram" />
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="contact-icon whatsapp" />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
