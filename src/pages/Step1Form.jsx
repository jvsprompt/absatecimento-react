import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import InputDropdown from '../components/InputDropdown';

import AppContext from '../context/AppContext';

function Step1Form() {
  const {
    type,
    setType,
    cc,
    setCc,
  } = useContext(AppContext);

  const [cc2, setCc2] = useState('');

  const setCc3 = (a) => {
    setCc(a);
    setCc2(a);
    localStorage.setItem('cc4', a);
  };

  const setType3 = (a) => {
    setType(a);
    localStorage.setItem('type4', a);
  };

  const ccs = [
    '0621	- HMOGC',
    '0797	- IGUA - EM',
    '0807	- 2.2 - AC',
    '0808	- 3.1 - AC',
    '0809	- 5.2 - AC',
    '0810	- TEIAS - AC',
    '0811	- TIVIT',
    '0816	- CMS - FC',
    '0818	- IGUA - ADM',
    '0822	- COPPEAD',
    '0823	- HMAS',
    '0824	- CMS - PN',
    '0825	- CMS - BP',
  ];

  const types = [
    'FERRAMENTA',
    'EPI',
    'MATERIAL',
  ];

  useEffect(() => { console.log('type =>', type)});

  return (
    <div className='main-div'>
      <h1>Solicitação de Material</h1>
      <InputDropdown
        name='Selecione o CC'
        value={cc}
        change={setCc3}
        items={ccs}
        localStore={false}
        placeholder={true} 
      />
      {
        cc2 === '' ?
          null :
          <InputDropdown
            name='Tipo da Solicitação'
            value={type}
            change={setType3}
            items={types}
            localStore={false}
          />
      }
      <Button
        className='test button-step1'
        variant='primary'
        active
        type='submit'
        value='Submit'
        href='/form'
        disabled={cc2 === '' ? true : false}
      >
        Próximo
      </Button>
    </div>
  );
}

export default Step1Form;
