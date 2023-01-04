import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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

  const cc5 = localStorage.getItem('cc4');
  const cc4 = cc5.slice(0, 4);
  const type4 = localStorage.getItem('type4');

  const [modalShow, setModalShow] = useState(false);
  const [materiaisValue, setMateriaisValue] = useState([{
    tag: '0000',
    name: '0000',
    unidade: 'UN',
  }]);
  const [isLoading, setIsLoading] = useState(true);
  const [smN, setSmN] = useState();

  const loadMateriaisModal = async () => {
    await setIsLoading(true);
    const materiaisF = await getMateriais(type4);
    setMateriaisValue(materiaisF);
    setIsLoading(false);
  };

  const columns = ['TAG', 'DESCRIÇÃO'];

  const getSmNumber = async () => {
    const { data } = await axios.get(`http://lmfcloud.ddns.net:8000/contador/${type4}`);
    console.log('sm [ OK! ]', await data);
    return data;
  };

  const returnMails = () => {
    if (cc4 === '0621') {
      return ['pcm@monteiroinstalacoes.com.br'];
    }

    if (
      cc4 === '0797'
      || cc4 === '0807'
      || cc4 === '0808'
      || cc4 === '0809'
      || cc4 === '0810'
    ) {
      return [
        'suporte.pcm@monteiroinstalacoes.com.br',
        'analista.pcm@monteiroinstalacoes.com.br',
      ];
    }

    if (cc4 === '0811') {
      return ['coordenador@monteiroinstalacoes.com.br'];
    }

    if (cc4 === '0816') {
      return ['obras@monteiroinstalacoes.com.br'];
    }

    if (cc4 === '0818') {
      return [
        'suporte.pcm@monteiroinstalacoes.com.br',
        'analista.pcm@monteiroinstalacoes.com.br',
      ];
    }

    if (cc4 === '0822') {
      return [
        'manutencao.coppead@monteiroinstalacoes.com.br',
        'coordenador@monteiroinstalacoes.com.br',
      ];
    }

    if (cc4 === '0823') {
      return ['obra.hmas@monteiroinstalacoes.com.br'];
    }

    if (cc4 === '0824' || cc4 === '0825') {
      return ['obra.cmspn@monteiroinstalacoes.com.br'];
    }
  };

  const sendMail = async () => {
    const newList = materialList.map((d) => {
      return {
        tag: d.tag,
        description: d.name,
        quantity: d.quantidade,
        un: d.unidade,
      };
    });

    await axios.post('http://lmfcloud.ddns.net:7000/custom/sendmail', {
      type: type4,
      cost: cc4,
      number: await smN,
      mails: returnMails(),
      products: newList,
    });
  };

  const sendData = async () => {
    const url = HMON_URI;
    await setSmN(await getSmNumber());

    for (let i = 0; i < materialList.length; i++) {
      const dataToPost = new FormData();
      console.log('index =>', i);

      dataToPost.append(entry.cliente, `${cc4}-SM-${type4.slice(0, 3)}-${smN}`);
      dataToPost.append(entry.codigo, materialList[i].tag);
      dataToPost.append(entry.material, materialList[i].name);
      dataToPost.append(entry.setor, 'HMON');
      dataToPost.append(entry.unid, materialList[i].unidade);
      dataToPost.append(entry.qtd, materialList[i].quantidade);
      dataToPost.append(entry.obs, materialList[i].obs);
      dataToPost.append(entry.status, '0. SOLICITADO');
      dataToPost.append('entry.1608830690', type4);

      console.log(materialList[i].name);
      console.log(`post ${i} <=> data => ${materialList[i]}`)
      console.log(materialList[i]);

      submitForm(url, dataToPost);
    }

    sendMail();
    document.location.href = '/';

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
          Não há nenhum item na lista
        </td>
      </tr>
    );
    return message;
  };

  useEffect(() => { loadMateriaisModal() }, [])

  return isLoading ? <Loading /> : (
    <div className='main-div'>
      <Button
        variant='primary'
        active
        type='submit'
        value='Submit'
        href='/'
        className='voltar-form'
      >
        {`< Voltar`}
      </Button>
      <EquipModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
        table={materiaisValue}
      />
      <label htmlFor='material' className='block table table-material'>
        <span className='materiais-title'>{`${cc4}-SM-${type4}`}</span>
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
        Selecionar Item
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
