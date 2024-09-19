import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
