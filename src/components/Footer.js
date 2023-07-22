import React from "react";

const Footer = () => {
  const footerStyles = {
    backgroundColor: "#F9A825",
    color: "#FFFFFF",
    padding: "2rem",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "8%",
  };

  const pStyles = {
    margin: 0,
    fontSize: "0.9rem",
    fontWeight: "normal",
    letterSpacing: "0.5px",
  };

  return (
    <footer style={footerStyles}>
      <p style={pStyles}>&copy; {new Date().getFullYear()} Code Gama</p>
    </footer>
  );
};

export default Footer;
