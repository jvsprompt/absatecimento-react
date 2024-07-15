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

  const ccs1 = [
    //'0621 - HMOGC',
    '0797 - IGUA - EM',
    '0807 - 2.2 - AC',
    // '0808 - 3.1 - AC',
    // '0809 - 5.2 - AC',
    // '0810 - TEIAS - AC',
    '0811 - TIVIT - LPU',
    '0816 - CFFC',
    '0818 - IGUA - ADM',
    '0822 - COPPEAD',
    // '0823 - HMAS',
    '0824 - CMSPN',
    // '0825 - CMSBP',
    '0828 - HMFST',
    '0000 - RH',
    //'0829 - VIMOLBRAS',
    //'0831 - COPPEAD CE.',
    '0838 - CAPS MA',
    '0839 - ASSAI DESUM',
    '0840 – COPPEAD TANQUE',
    '0841 – CRUX 80K',
    '0842 - 2024.02.000002 - TAKODA (Iluminação Emergência)',
    '0844 - 2024.05.000004 - Viva Rio 3.1 Vila do João (Manutenção Academia Carioca)',
    '0845 - 2024.04.000005 - COPPEAD (Adequação Centro Pesquisa Inovacao)',
    '0846 - 2024.05.000016 - Igua Casa Shopping (Automação VRF)',
    '0848 - 2023.10.000011 - COPPEAD (Manutenção QTA)',
    '0849 - Vesuvius Rio (Adequação Climatização Galpão MIX)',
    '0850 - COPPEAD (REPARO VAZAMENTO AGUA)',
    ];

  const ccs = ccs1.sort();

  const types = [
    'FERRAMENTA',
    'EPI',
    'MATERIAL',
  ];

  useEffect(() => { console.log('type =>', type) });
  useEffect(() => {
    localStorage.setItem('type4', 'FERRAMENTA');
  }, []);

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
