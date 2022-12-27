import React, { useContext, useState } from 'react';
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
  };

  const ccs = [
    '0621	HMOGC',
    '0797	IGUA - EM',
    '0807	2.2 - AC',
    '0808	3.1 - AC',
    '0809	5.2 - AC',
    '0810	TEIAS - AC',
    '0811	TIVIT',
    '0816	CMS - FC',
    '0818	IGUA - ADM',
    '0822	COPPEAD',
    '0823	HMAS',
    '0824	CMS - PN',
    '0825	CMS - BP',
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
        change={setCc3}
        items={ccs}
        localStore={false}
        placeholder={true}
      />
      {
        cc2 === '' ?
          null :
          <InputDropdown
            name='CATEGORIA'
            value={type}
            change={setType}
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
        Ir para requisição de material
      </Button>
    </div>
  );
}

export default Step1Form;
