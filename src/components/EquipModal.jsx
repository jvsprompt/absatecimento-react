import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import AppContext from '../context/AppContext';

import '../css/EquipModal.css';
import { useDebugValue } from 'react';

function EquipModal(props) {
  const {
    materialList,
    setMaterialList,
  } = useContext(AppContext);
  const table = props.table;

  const [selectedItem, setSelectedItem] = useState({
    id: '',
    tag: '',
    name: '',
    unidade: '',
  });
  const [filteredData, setFilteredData] = useState(table);
  const [searchInput, setSearchInput] = useState('');
  const [quantidade, setQuantidade] = useState();
  const [obsValue, setObsValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const removeSelectedClass = () => {
    // Provisório ↑
    console.log('removing selected class')
    const selectedClass = document.querySelector('.selected');
    if (selectedClass) {
      selectedClass.classList.remove('selected');
    }
  };

  const selectedI = async (event) => {
    console.log('running selectedI');
    const selected = event.target;

    removeSelectedClass();
    selected.parentNode.classList.add('selected');

    const findMaterial = props.table.find((data) => {
      const s = selected.parentNode.innerText.split('	');
      if (data.tag === s[0]) return true;
      return false;
    });
    setSelectedItem(findMaterial);
    console.log(selectedItem);
  };

  const updateSearch = (e) => {
    const searchNormalize = searchInput
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const filter = table.filter(({ name, tag }) =>
      name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(searchNormalize)
      || tag.includes(searchNormalize)
      || tag.includes(99999)
    );
    setFilteredData(filter);
  };

  const {
    id,
    tag,
    name,
    unidade,
  } = selectedItem;

  const restoreDefaultValues = () => {
    setSearchInput('');
    setObsValue('');
    setQuantidade('');
    setSelectedItem({
      id: '',
      tag: '',
      name: '',
      unidade: '',
    });
  };

  const pushMaterial = () => {
    const pushItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      quantidade: quantidade ? quantidade : '0',
      tag: selectedItem.tag,
      unidade: selectedItem.unidade,
      obs: obsValue ? obsValue : '',
    };
    setMaterialList([...materialList, pushItem]);
    restoreDefaultValues();
  };

  useEffect(() => {
    updateSearch()
  }, [searchInput]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Digite a Tag ou o Nome"
            value={searchInput}
            className='search-input'
            onChange={(e) => {
              setSearchInput(e.target.value.toUpperCase())
            }}
          />
        </Form.Group>
      </Modal.Header> */}
      <Modal.Body>
        <Form.Group className="mb-3 search-input modal-input">
          <Form.Control
            type="text"
            placeholder="Digite a Tag ou o Nome"
            value={searchInput}
            className=''
            onChange={(e) => {
              setSearchInput(e.target.value.toUpperCase())
            }}
          />
        </Form.Group>
        <table className='table modal-table'>
          <thead>
            <tr>
              {props.columns.map((data, i) => (
                <th key={i}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, i) => (
              <tr onClick={selectedI} key={i}>
                <td>{data.tag}</td>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Form>
          <Form.Group className="mb-3 tag-input modal-input">
            <Form.Label>TAG</Form.Label>
            <Form.Control
              type='text'
              placeholder=' '
              value={tag}
              readOnly
            />
          </Form.Group>
          <Form.Group className='mb-3 tag-input modal-input'>
            <Form.Label>QUANTIDADE</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              value={quantidade}
              onChange={(e) => {
                setQuantidade(e.target.value)
                setSelectedItem({
                  id, tag, name,
                  quantidade: quantidade,
                  unidade,
                })
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3 tag-input modal-input'>
            <Form.Label>UNIDADE</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              value={unidade}
              onChange={(e) => {
                if (tag !== '99999') return;
                setSelectedItem({
                  id, tag, name, quantidade,
                  unidade: e.target.value
                    .toUpperCase(),
                })
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3 modal-input'>
            <Form.Label>DESCRIÇÃO</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              value={name}
              onChange={(e) => {
                if (tag !== '99999') return;
                setSelectedItem({
                  id, tag, name: e.target.value
                    .toUpperCase(),
                  quantidade, unidade,
                })
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3 modal-input'>
            <Form.Label>OBSERVAÇÃO</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              value={obsValue}
              onChange={(e) => {
                setObsValue(e.target.value.toUpperCase())
              }}
            />
          </Form.Group>
        </Form>
        <label htmlFor='continuar'>
          <input
            type='checkbox'
            id='continuar'
            name='continuar'
            value='continuar'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          Continuar Incluindo
        </label>
        <Button
          className='modal-button select-button'
          onClick={() => {
            if (isChecked === true) {
              pushMaterial();
              return restoreDefaultValues();
            }
            pushMaterial()
            restoreDefaultValues();
            props.onHide()
          }}>Selecionar</Button>
        <Button
          variant='danger'
          className='modal-button cancel-button'
          onClick={() => {
            props.onHide()
            restoreDefaultValues()
          }}
        ><span className='cancel-button'>Cancelar</span></Button>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            props.onHide()
            restoreDefaultValues()
          }}
        >Cancelar</Button>
        <Button onClick={() => {
          pushMaterial()
          props.onHide()
        }}>Selecionar</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default EquipModal;
