import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ScrollButton = () => {
  const navigate = useNavigate();

  const goToAppointment = () => {
    navigate('/appointment');
  };

  return (
    <button
      id="scrollButton"
      className="btn btn-primary scrollButton"
      onClick={goToAppointment}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        visibility: "visible",
        zIndex:"9999",
        borderRadius: "0",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#005a5a",
        color: "#fff",
        border: "none",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#2d8979";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#40b498";
        e.target.style.transform = "scale(1)";
      }}
    >
      BOOK AN APPOINTMENT <FaCalendarAlt />
    </button>
  );
};

export default ScrollButton;
