import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';

import EquipModal from '../components/EquipModal';

import submitForm from '../utils/submitForm';

import { ENTRY_HMON as entry, HMON_URI } from '../config/strings';
import getMateriais from '../utils/getMateriais';
import Loading from '../components/Loading';

import AppContext from '../context/AppContext';

function FormHMON() {
  const {
    materialList,
    setMaterialList,
  } = useContext(AppContext);

  const [modalShow, setModalShow] = useState(false);
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

  const sendData = () => {
    const url = HMON_URI;

    for (let i = 0; i < materialList.length; i++) {
      const dataToPost = new FormData();
      console.log('index =>', i);

      dataToPost.append(entry.cliente, 'HMON');
      dataToPost.append(entry.codigo, materialList[i].tag);
      dataToPost.append(entry.material, materialList[i].name);
      dataToPost.append(entry.setor, 'HMON');
      dataToPost.append(entry.unid, materialList[i].unidade);
      dataToPost.append(entry.qtd, materialList[i].quantidade);
      dataToPost.append(entry.obs, materialList[i].obs);
      dataToPost.append(entry.status, '1. SOLICITADO');

      console.log(materialList[i].name);
      console.log(`post ${i} <=> data => ${materialList[i]}`)
      console.log(materialList[i]);

      submitForm(url, dataToPost);
    }

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
              variant='danger'
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
      <tr>
        <td className='lista-material'>
          Não há nenhum material na lista
        </td>
      </tr>
    );
    return message;
  };

  useEffect(() => { loadMateriaisModal() }, [])

  return isLoading ? <Loading /> : (
    <div className='main-div'>
      <EquipModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
        table={materiaisValue}
        selectedItem={{}}
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
