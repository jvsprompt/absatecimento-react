import React, { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';

const Alerts = ({ show, handleClose, title = "Atenção", message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, handleClose]);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1060 }}>
      <Alert 
        style={{ backgroundColor: '#00AF54', borderColor: '#00AF54' }} 
        className="alert-dismissible fade show text-white" 
        role="alert"
      >
        <h4 className="alert-heading">{title}</h4>
        <p>{message}</p>
        <Button variant="close" onClick={handleClose} aria-label="Close" />
      </Alert>
    </div>
  );
};

export default Alerts;
