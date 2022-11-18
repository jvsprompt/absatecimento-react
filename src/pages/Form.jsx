import React, { useEffect, useState } from 'react';

import InputDate from '../components/InputDate';
import InputDropdown from '../components/InputDropdown';
// import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import submitForm from '../utils/submitForm';
import unidades from '../data/unidades.json';
// import servico from '../data/servicos.json';
import Button from 'react-bootstrap/Button';

import getSetor from '../utils/getSetor';

function Form() {
  const [servicosValue, setServicosValue] = useState(new Date());
  const [dataLevantValue, setDataLevantValue] = useState(new Date());
  const [unidadesValue, setUnidadesValue] = useState(unidades[0]);
  const [setorValue, setSetorValue] = useState('');
  const [materiaisValue, setMateriaisValue] = useState('');

  const entry = {
    servico: 'entry.72998713',
    date: 'entry.1309448216',
    unidade: 'entry.275485717',
    setor: 'entry.1073286246',
    materiais: 'entry.1986892611',
    os: 'entry.1053084165',
    day: 'entry.1309448216_day',
    month: 'entry.1309448216_month',
    year: 'entry.1309448216_year',
    day2: 'entry.72998713_day',
    month2: 'entry.72998713_month',
    year2: 'entry.72998713_year',
    enc: 'entry.848539894',
    serv: 'entry.1136451657'
  };

  const getDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return { day, month, year };
  };

  const getDate2 = (date) => {
    const d2 = new Date(date);
    const day2 = d2.getDate();
    const month2 = d2.getMonth() + 1;
    const year2 = d2.getFullYear();

    return { day2, month2, year2 };
  };

  const validateData = () => {
    if (materiaisValue === '') {
      return 'O campo de materiais não pode estar vazio!'
    }

    return true;
  };

  const restoreDefaultValues = () => {
    setServicosValue(new Date());
    setDataLevantValue(new Date());
    setUnidadesValue(unidades[0]);
    setSetorValue(setor1)
    setMateriaisValue('');
  };

  const setor1 = getSetor(unidadesValue)[0];

  const sendData = () => {
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdEkBoaxNY5D8JJqKmBwcpcJHVfhJmMvigYJIsvAN5FdKmCoQ/formResponse'
    const dataToPost = new FormData();

    const testData = validateData();

    if (testData === true) {
      const { day, month, year } = getDate(dataLevantValue);
      const { day2, month2, year2 } = getDate2(servicosValue);
      const materialUpper = materiaisValue.toUpperCase();

      // dataToPost.append(entry.servico, servicosValue);
      dataToPost.append(entry.os, 'ABRIR CHAMADO');
      dataToPost.append(entry.enc, ' ');
      dataToPost.append(entry.serv, ' ');
      dataToPost.append(entry.day, day);
      dataToPost.append(entry.month, month);
      dataToPost.append(entry.year, year);
      dataToPost.append(entry.day2, day2);
      dataToPost.append(entry.month2, month2);
      dataToPost.append(entry.year2, year2);
      dataToPost.append(entry.unidade, unidadesValue);
      dataToPost.append(entry.setor, setorValue);
      dataToPost.append(entry.materiais, materialUpper);

      submitForm(url, dataToPost);

      restoreDefaultValues();

      if (navigator.onLine) {
        return alert('ENVIADO COM SUCESSO!');
      }

      else {
        alert('NÃO FOI POSSÍVEL ENVIAR, VERIFIQUE SUA CONEXÃO COM A INTERNET!');
      }

      return ('');
    }
    alert(testData);
  };

  useEffect(() => {
    setSetorValue(setor1);
  }, [unidadesValue]);

  useEffect(() => {
    console.log('servicos =>', servicosValue);
    console.log('dataLevant =>', dataLevantValue);
    console.log('unidades =>', unidadesValue);
    console.log('setor =>', setorValue);
    console.log('mateirais =>', materiaisValue);
    console.log('');
  });

  return (
    <div className='main-div'>

      <InputDate
        name='DATA DO PEDIDO'
        value={dataLevantValue}
        change={setDataLevantValue}
        localStore={false}
      // classN='input2 '
      />
      <InputDate
        name='DATA DE ENTREGA'
        value={servicosValue}
        change={setServicosValue}
        localStore={false}
      // classN='input2 '
      />
      <div></div>
      <InputDropdown
        name='UNIDADE'
        value={unidadesValue}
        change={setUnidadesValue}
        items={unidades}
        localStore={false}
      />
      <InputDropdown
        name='EQUIPAMENTO'
        value={setorValue}
        change={setSetorValue}
        items={getSetor(unidadesValue)}
        localStore={false}
      />
      <InputTextArea
        name='MATERIAL'
        value={materiaisValue}
        change={setMateriaisValue}
        localStore={false}
        cols='30'
        rows='6'
        maxLen={1500}
      />
      {/* <button
  onClick={() => {
    if (navigator.onLine){
      alert('you are online dude!');
    }
    else{
     alert('sorry, you are offline');
    }
  }}
> Check connection
</button> */}
      <Button className="test" variant="primary" size="" active type="submit" value="Submit" onClick={sendData}>Enviar</Button>
      {/* className="myButton" type="submit" onClick={sendData} */}
      <div className='botton'></div>
    </div>

  );
}

export default Form;