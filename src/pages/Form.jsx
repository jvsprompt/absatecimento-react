import React, { useState } from 'react';

import InputDate from '../components/InputDate';
import InputDropdown from '../components/InputDropdown';
import InputText from '../components/InputText';

function Form() {
  const [encarregadoValue, setEncarregadoValue] = useState('');
  const [servicosValue, setServicosValue] = useState('');
  const [dataLevantValue, setDataLevantValue] = useState('');
  // const [data1ExValue, setData1ExValue] = useState('');
  // const [data2ExValue, setData2ExValue] = useState('');
  const [unidadesValue, setUnidadesValue] = useState('');
  const [setorValue, setSetorValue] = useState('');
  const [osValue, setOsValue] = useState('');
  const [materiaisValue, setMateriaisValue] = useState('');

  return (
    <div className='main-div'>
      <InputDropdown
        name='ENCARREGADO'
        entry=''
        value={encarregadoValue}
        change={setEncarregadoValue}
        items={['ENCARREGADO 1', 'ENCARREGADO 2', 'ENCARREGADO 3']}
        localStore={true}
      />
      <InputDropdown
        name='SERVIÇO'
        entry=''
        value={servicosValue}
        change={setServicosValue}
        items={['SERVIÇO 1', 'SERVIÇO 2', 'SERVIÇO 3']}
        localStore={false}
      />
      <InputDate
        name='DATA DE LEVANTAMENTO'
        entry=''
        value={dataLevantValue}
        change={setDataLevantValue}
        localStore={false}
      />
      {/* <InputDate
        name='1ª DATA DE EXECUÇÃO'
        entry=''
        value={data1ExValue}
        change={setData1ExValue}
        localStore={false}
      />
      <InputDate
        name='2ª DATA DE EXECUÇÃO'
        entry=''
        value={data2ExValue}
        change={setData2ExValue}
        localStore={false}
      /> */}
      <InputDropdown
        name='UNIDADE'
        entry=''
        value={unidadesValue}
        change={setUnidadesValue}
        items={['UNIDADE 1', 'UNIDADE 2', 'UNIDADE 3']}
        localStore={false}
      />
      <InputText
        name='SETOR'
        entry=''
        value={setorValue}
        change={setSetorValue}
        localStore={false}
      />
      <InputText
        name='OS'
        entry=''
        value={osValue}
        change={setOsValue}
        localStore={false}
      />
      <InputText
        name='MATERIAIS'
        entry=''
        value={materiaisValue}
        change={setMateriaisValue}
        localStore={false}
      />
    </div>
  );
}

export default Form;
