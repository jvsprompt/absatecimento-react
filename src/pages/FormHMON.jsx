import React, { useEffect, useState, useContext } from 'react';
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

import AppContext from '../context/AppContext';

function FormHMON() {
  const {
    materialList,
    setMaterialList,
  } = useContext(AppContext);

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

  const columns = ['TAG', 'DESCRIÇÃO'];

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

  const removeMaterial = (id) => {
    setMaterialList(
      materialList.filter((info) => info.id !== id)
    );
  };

  const renderTable = () => {
    if (materialList.length !== 0) {
      const table = materialList.map((item, i) => (
        <tr>
          {/* <td>{item.tag}</td> */}
          <td>{item.name}</td>
          <td>{item.quantidade}</td>
          <td>
            <Button className='botao-lista'
              onClick={
                () => removeMaterial(item.id)
              }>
              -
            </Button>
          </td>
        </tr>
      ));
      return table;
    }

    const message = (
      <li className='lista-material'>
        Não há nenhum material na lista
      </li>
    );
    return message;
  };

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
      <EquipModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
        table={materiaisValue}
      />
      <label htmlFor='material' className='block table table-material'>
        <span className='materiais-title'>MATERIAIS</span>
        <table>
          <thead>
            <tr>
              <td>DESCRIÇÃO</td>
              <td>QUANTIDADE</td>
            </tr>
          </thead>
          <tbody>
            {renderTable()}
          </tbody>
        </table>
      </label>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Selecionar Material
      </Button>
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
