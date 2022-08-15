import React, { useEffect, useState } from 'react';

import InputDate from '../components/InputDate';
import InputDropdown from '../components/InputDropdown';
// import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import submitForm from '../utils/submitForm';
import unidades from '../data/unidades.json';
import setor from '../data/setores.json';
import servico from '../data/servicos.json';

function Form() {
  // const [encarregadoValue, setEncarregadoValue] = useState('');
  const [servicosValue, setServicosValue] = useState(servico[0]);
  const [dataLevantValue, setDataLevantValue] = useState(new Date());
  // const [data1ExValue, setData1ExValue] = useState('');
  // const [data2ExValue, setData2ExValue] = useState('');
  const [unidadesValue, setUnidadesValue] = useState(unidades[0]);
  const [setorValue, setSetorValue] = useState('');
  // const [osValue, setOsValue] = useState('');
  const [materiaisValue, setMateriaisValue] = useState('');

  const entry = {
    // ecarregado: 'entry.848539894',
    servico: 'entry.1136451657',
    date: 'entry.1309448216',
    unidade: 'entry.275485717',
    setor: 'entry.1073286246',
    materiais: 'entry.1986892611',
    os: 'entry.1053084165',

    day: 'entry.1309448216_day',
    month: 'entry.1309448216_month',
    year: 'entry.1309448216_year',

  };

  const getDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return { day, month, year };
  };

  const validateData = () => {
    if (materiaisValue === '') {
      return 'O campo de materiais não pode estar vazio!'
    }

    return true;
  };

  const getSetor = (unidade) => {
    if (unidade === '') {
      return ['Selecione a unidade primeiro'];
    }

    if (unidade === 'UPA-BOTAFOGO') {
      return setor.botafogo;
    }

    if (unidade === 'UPA-COPACABANA') {
      return setor.copacabana;
    }

    if (unidade === 'UPA-MARÉ') {
      return setor.mare;
    }
  };

  const setor1 = getSetor(unidadesValue)[0];

  const sendData = () => {
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdEkBoaxNY5D8JJqKmBwcpcJHVfhJmMvigYJIsvAN5FdKmCoQ/formResponse'
    const dataToPost = new FormData();

    const testData = validateData();

    if (testData === true) {
      const { day, month, year } = getDate(dataLevantValue);
      const materialUpper = materiaisValue.toUpperCase();
     
      dataToPost.append(entry.servico, servicosValue);
      dataToPost.append(entry.os, 'ABRIR CHAMADO');
      dataToPost.append(entry.day, day);
      dataToPost.append(entry.month, month);
      dataToPost.append(entry.year, year);
      dataToPost.append(entry.unidade, unidadesValue);
      dataToPost.append(entry.setor, setorValue);
      dataToPost.append(entry.materiais, materialUpper);

      submitForm(url, dataToPost);

      setServicosValue(servico[0]);
      setDataLevantValue(new Date());
      setUnidadesValue(unidades[0]);
      setSetorValue(setor1)
      setMateriaisValue('');

      return alert('Enviado!');
    }
    alert(testData);
  };

  useEffect(() => {
    setSetorValue(setor1);
  }, []);

  return (
    <div className='main-div'>
      {/* <InputDropdown
        name='ENCARREGADO'
        value={encarregadoValue}
        change={setEncarregadoValue}
        items={['ENCARREGADO 1', 'ENCARREGADO 2', 'ENCARREGADO 3']}
        localStore={true}
      /> */}
      <InputDropdown
        name='SERVIÇO'
        value={servicosValue}
        change={setServicosValue}
        items={servico}
        localStore={false}
        classN='Input2 '
      />
      <InputDate
        name='DATA DE LEVANTAMENTO'
        value={dataLevantValue}
        change={setDataLevantValue}
        localStore={false}
      // classN='input2 '
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
        items={unidades}
        localStore={false}
      />
      <InputDropdown
        name='SETOR'
        value={setorValue}
        change={setSetorValue}
        items={getSetor(unidadesValue)}
        localStore={false}
      />
      {/* <InputText
        name='OS'
        value={osValue}
        change={setOsValue}
        localStore={false}
      /> */}
      <InputTextArea
        name='MATERIAIS'
        value={materiaisValue}
        change={setMateriaisValue}
        localStore={false}
        cols='30'
        rows='6'
        maxLen={1500}
      // minLen={9}
      // classN='input2 '
      />
      <button className="myButton" type="submit" onClick={sendData}>Enviar</button>
      <div className='botton'></div>
    </div>

  );
}

export default Form;