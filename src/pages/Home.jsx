import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={`/equipamentos`}>Ir para equipamentos</Link>
      <br />
      <br />
      <Link to={`/form/hmon`}>Ir para formulário HMON</Link>
      <br />
      <br />
      <Link to={`/form/academia`}>Ir para formulário Academia</Link>
      <br />
      <br />
      <Link to={`/abastecimento`}>Ir para abastecimento</Link>
    </div>
  );
}

export default Home;
