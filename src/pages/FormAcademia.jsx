import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import InputDate from '../components/InputDate';
import InputDropdown from '../components/InputDropdown';
import InputTextArea from '../components/InputTextArea';

import submitForm from '../utils/submitForm';
import getSetor from '../utils/getSetor';
import getDate from '../utils/getDate';

import { ENTRY as entry, academiaURI } from '../config/strings';
import unidades from '../data/unidades.json';

function Form() {
  const [servicosValue, setServicosValue] = useState(new Date());
  const [dataLevantValue, setDataLevantValue] = useState(new Date());
  const [unidadesValue, setUnidadesValue] = useState(unidades[0]);
  const [setorValue, setSetorValue] = useState('');
  const [materiaisValue, setMateriaisValue] = useState('');

  const restoreDefaultValues = () => {
    setServicosValue(new Date());
    setDataLevantValue(new Date());
    setUnidadesValue(unidades[0]);
    setSetorValue(setor1)
    setMateriaisValue('');
  };

  const validateData = (data) => {
    if (!data) {
      return 'Lista de materiais não pode estar vazia!'
    }
    return true;
  };

  const setor1 = getSetor(unidadesValue)[0];

  const sendData = () => {
    const url = academiaURI;
    const testData = validateData(materiaisValue);
    const dataToPost = new FormData();

    if (testData === true) {
      const { day, month, year } = getDate(dataLevantValue);
      const date = getDate(servicosValue);
      const materialUpper = materiaisValue.toUpperCase();

      dataToPost.append(entry.os, 'ABRIR CHAMADO');
      dataToPost.append(entry.enc, ' ');
      dataToPost.append(entry.serv, ' ');
      dataToPost.append(entry.day, day);
      dataToPost.append(entry.month, month);
      dataToPost.append(entry.year, year);
      dataToPost.append(entry.day2, date.day);
      dataToPost.append(entry.month2, date.month);
      dataToPost.append(entry.year2, date.year);
      dataToPost.append(entry.unidade, unidadesValue);
      dataToPost.append(entry.setor, setorValue);
      dataToPost.append(entry.materiais, materialUpper);

      submitForm(url, dataToPost);
    }
    restoreDefaultValues();

    if (navigator.onLine) {
      return alert('ENVIADO COM SUCESSO!');
    } else {
      return alert('NÃO FOI POSSÍVEL ENVIAR, VERIFIQUE SUA CONEXÃO COM A INTERNET!');
    }
  };

  useEffect(() => {
    setSetorValue(setor1);
  }, [unidadesValue]);

  // useEffect(() => {
  //   console.log('servicos =>', servicosValue);
  //   console.log('dataLevant =>', dataLevantValue);
  //   console.log('unidades =>', unidadesValue);
  //   console.log('setor =>', setorValue);
  //   console.log('mateirais =>', materiaisValue);
  //   console.log('materials list =>', materialsList)
  //   console.log('');
  // });

  return (
    <div className='main-div'>
      <InputDate
        name='DATA DO PEDIDO'
        value={dataLevantValue}
        change={setDataLevantValue}
        localStore={false}
      />
      <InputDate
        name='DATA DE ENTREGA'
        value={servicosValue}
        change={setServicosValue}
        localStore={false}
      />
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
      <Button
        className='test'
        variant='primary'
        active
        type='submit'
        value='Submit'
        onClick={sendData}
      >
        Enviar
      </Button>
    </div>
  );
}

export default Form;
