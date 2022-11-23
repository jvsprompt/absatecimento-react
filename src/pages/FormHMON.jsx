import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import InputDropdown from '../components/InputDropdown';
import EquipModal from '../components/EquipModal';
import InputText from '../components/InputText';

import submitForm from '../utils/submitForm';
import getSetor from '../utils/getSetor';
import getDate from '../utils/getDate';

import { ENTRY_HMON as entry, HMON_URI } from '../config/strings';
import unidades from '../data/unidades.json';

function FormHMON() {
  const [servicosValue, setServicosValue] = useState(new Date());
  const [dataLevantValue, setDataLevantValue] = useState(new Date());
  const [unidadesValue, setUnidadesValue] = useState(unidades[0]);
  const [setorValue, setSetorValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [materialsList, setMaterialsList] = useState([]);
  const [mId, setMId] = useState(1);
  const [modalShow, setModalShow] = useState(false);

  const restoreDefaultValues = () => {
    setServicosValue(new Date());
    setDataLevantValue(new Date());
    setUnidadesValue(unidades[0]);
    setSetorValue(setor1)
    setMaterialsList([]);
  };

  const validateData = (data) => {
    if (!data) {
      return 'Lista de materiais não pode estar vazia!'
    }
    return true;
  };

  const setor1 = getSetor(unidadesValue)[0];

  const sendData = () => {
    const url = HMON_URI;
    const testData = validateData(materialsList);

    for (let i = 0; i < materialsList.length; i++) {
      const dataToPost = new FormData();
      console.log('index =>', i);

      if (testData === true) {
        const { day, month, year } = getDate(dataLevantValue);
        const date = getDate(servicosValue);
        const materialUpper = materialsList[i].name.toUpperCase();

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
    }
    restoreDefaultValues();

    if (navigator.onLine) {
      return alert('ENVIADO COM SUCESSO!');
    } else {
      return alert('NÃO FOI POSSÍVEL ENVIAR, VERIFIQUE SUA CONEXÃO COM A INTERNET!');
    }
};

// const renderList = () => {
//   const list = materialsList.map((item, i) => (
//     <li className='lista-material' key={i}>
//       {item.name}
//       <Button className='botao-lista' onClick={
//         () => removeMaterial(item.id)
//       }>
//         Apagar
//       </Button>
//     </li>
//   ));
//   return list;
// };

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
    <InputDropdown
      name='UNIDADE'
      value={unidadesValue}
      change={setUnidadesValue}
      items={unidades}
      localStore={false}
    />
    {/* <InputDropdown
      name='EQUIPAMENTO'
      value={setorValue}
      change={setSetorValue}
      items={getSetor(unidadesValue)}
      localStore={false}
    /> */}


    <InputText name='TAG' value={tagValue} change={setTagValue} />
    <Button variant="primary" onClick={() => setModalShow(true)}>
      Selecionar Equipamento
    </Button>
    <EquipModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />


    {/* <label htmlFor='material' className='block'>
      <span className='materiais-title'>MATERIAIS</span>
      <ul className='lista-materiais'>
        {renderList()}
      </ul>
      <input
        type='text'
        id='material'
        value={materiaisValue}
        onChange={(e) => updateMaterialValue(e)}
        className='form-control input materiais-input'
        placeholder='DIGITE O SETOR'
      />
      <Button
        className='input materiais-button'
        variant='primary'
        active
        type='submit'
        value='Submit'
        onClick={() => updateMaterialsList(materiaisValue)}
      >
        Adicionar
      </Button>
    </label> */}
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

export default FormHMON;
