import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import InputDropdown from '../components/InputDropdown';

import AppContext from '../context/AppContext';

function Step1Form() {
  const {
    materialList,
    setMaterialList,
    type,
    setType,
    cc,
    setCc,
  } = useContext(AppContext);

  const ccs = [
    'Teste',
  ];

  const types = [
    'FERRAMENTA',
    'EPI',
    'MATERIAL',
  ];

  return (
    <div>
      <InputDropdown
        name='CC'
        value={cc}
        change={setCc}
        items={ccs}
        localStore={false}
      />
      <InputDropdown
        name='CATEGORIA'
        value={type}
        change={setType}
        items={types}
        localStore={false}
      />
      <Link to={`/form`}>
        <Button>Ir para Solicitação de Material</Button>
      </Link>
    </div>
  );
}

export default Step1Form;
