import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={`/equipamentos`}>Ir para equipamentos</Link>
      <Link to={`/formulario`}>Ir para formulário</Link>
    </div>
  );
}

export default Home;
