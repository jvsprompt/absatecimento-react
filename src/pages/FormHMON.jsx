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
import getMateriais from '../utils/getMateriais';
import Loading from '../components/Loading';

function FormHMON() {
  const [modalShow, setModalShow] = useState(false);
  const [unidadesValue, setUnidadesValue] = useState();
  const [materiaisValue, setMateriaisValue] = useState([{
    tag: '0000',
    name: '0000',
    unidade: 'UN',
  }]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMateriaisModal = async () => {
    await setIsLoading(true);
    const materiaisF = await getMateriais();
    setMateriaisValue(materiaisF);
    setIsLoading(false);
  };

  const columns = ['TAG', 'DESCRIÇÃO', 'UNIDADE'];

  // const restoreDefaultValues = () => {
  //   setServicosValue(new Date());
  //   setDataLevantValue(new Date());
  //   setUnidadesValue(unidades[0]);
  //   setSetorValue(setor1)
  //   setMaterialsList([]);
  // };

  // const validateData = (data) => {
  //   if (!data) {
  //     return 'Lista de materiais não pode estar vazia!'
  //   }
  //   return true;
  // };


  const sendData = () => {
    const url = HMON_URI;

    // for (let i = 0; i < materialsList.length; i++) {
    //   const dataToPost = new FormData();
    //   console.log('index =>', i);

    //   if (testData === true) {
    //     const { day, month, year } = getDate(dataLevantValue);
    //     const date = getDate(servicosValue);
    //     // const materialUpper = materialsList[i].name.toUpperCase();

    //     submitForm(url, dataToPost);
    //   }
    // }
    // restoreDefaultValues();

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

// useEffect(() => {
//   setSetorValue(setor1);
// }, [unidadesValue]);

// useEffect(() => {
//   console.log('servicos =>', servicosValue);
//   console.log('dataLevant =>', dataLevantValue);
//   console.log('unidades =>', unidadesValue);
//   console.log('setor =>', setorValue);
//   console.log('mateirais =>', materiaisValue);
//   console.log('materials list =>', materialsList)
//   console.log('');
// });
  
  useEffect(() => { loadMateriaisModal() }, [])

return isLoading ? <Loading /> : (
  <div className='main-div'>
    {/* <InputDropdown
      name='UNIDADE'
      value={unidadesValue}
      change={setUnidadesValue}
      items={unidades}
      localStore={false}
    /> */}
    {/* <InputDropdown
      name='EQUIPAMENTO'
      value={setorValue}
      change={setSetorValue}
      items={getSetor(unidadesValue)}
      localStore={false}
    /> */}


    {/* <InputText name='TAG' value={tagValue} change={setTagValue} /> */}
    <Button variant="primary" onClick={() => setModalShow(true)}>
      Selecionar Material
    </Button>
    <EquipModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      columns={columns}
      table={materiaisValue}
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
