import React, { useState } from 'react';

import InputDate from '../components/InputDate';
import InputDropdown from '../components/InputDropdown';
import InputText from '../components/InputText';
import submitForm from '../utils/submitForm';


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

  const entry = {
    ecarregado: 'entry.848539894',
    servico: 'entry.1136451657',
    unidade: 'entry.275485717',
    
  }

  const sendData = () => {
    const url = 'fwsfwef';
    const dataToPost = new FormData();

    dataToPost.append(entry.ecarregado, encarregadoValue);
    dataToPost.append('', servicosValue);
    dataToPost.append('', dataLevantValue);
    dataToPost.append('', unidadesValue);
    dataToPost.append('', setorValue);
    dataToPost.append('', osValue);
    dataToPost.append('', materiaisValue);

    submitForm(url, dataToPost);
  };

  return (
    <div className='main-div'>
      <InputDropdown
        name='ENCARREGADO'
        value={encarregadoValue}
        change={setEncarregadoValue}
        items={['ENCARREGADO 1', 'ENCARREGADO 2', 'ENCARREGADO 3']}
        localStore={true}
      />
      <InputDropdown
        name='SERVIÇO'
        value={servicosValue}
        change={setServicosValue}
        items={['SERVIÇO 1', 'SERVIÇO 2', 'SERVIÇO 3']}
        localStore={false}
      />
      <InputDate
        name='DATA DE LEVANTAMENTO'
        value={dataLevantValue}
        change={setDataLevantValue}
        localStore={false}
      />
      {/* <InputDate
        name='1ª DATA DE EXECUÇÃO'
        value={data1ExValue}
        change={setData1ExValue}
        localStore={false}
      />
      <InputDate
        name='2ª DATA DE EXECUÇÃO'
        value={data2ExValue}
        change={setData2ExValue}
        localStore={false}
      /> */}
      <InputDropdown
        name='UNIDADE'
        value={unidadesValue}
        change={setUnidadesValue}
        items={['UNIDADE 1', 'UNIDADE 2', 'UNIDADE 3']}
        localStore={false}
      />
      <InputText
        name='SETOR'
        value={setorValue}
        change={setSetorValue}
        localStore={false}
      />
      <InputText
        name='OS'
        value={osValue}
        change={setOsValue}
        localStore={false}
      />
      <InputText
        name='MATERIAIS'
        value={materiaisValue}
        change={setMateriaisValue}
        localStore={false}
      />
      <button type="submit" onClick={sendData}>Enviar</button>
    </div>
  );
}

export default Form;
