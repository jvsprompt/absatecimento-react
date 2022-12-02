import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../css/EquipModal.css';

function EquipModal(props) {
  const table = props.table;

  const [selectedItem, setSelectedItem] = useState({});
  const [filteredData, setFilteredData] = useState(table);

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

  const {
    id,
    tag,
    name,
  } = selectedItem;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Equipamentos
        </Modal.Title> */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Digite a Tag ou o Nome"
            value={name}
            className='search-input'
          // onChange={(e) => setNewValue({
          //   id, tag, name: e.target.value,
          //   category, availableStock,
          //   minimumStock, active,
          // })}
          />
        </Form.Group>
      </Modal.Header>
      <Modal.Body>
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
                {/* <td>{data.unidade}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Form>
          <Form.Group className="mb-3 tag-input">
            <Form.Label>TAG</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Código"
              value={tag}
              // onChange={(e) => setNewValue({
              //   id, tag: e.target.value, name,
              //   category, availableStock,
              //   minimumStock, active,
              // })}
            />
          </Form.Group>
          <Form.Group className="mb-3 tag-input">
            <Form.Label>UNIDADE</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Código"
              value={tag}
            // onChange={(e) => setNewValue({
            //   id, tag: e.target.value, name,
            //   category, availableStock,
            //   minimumStock, active,
            // })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Nome"
              value={name}
              // onChange={(e) => setNewValue({
              //   id, tag, name: e.target.value,
              //   category, availableStock,
              //   minimumStock, active,
              // })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Selecionar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EquipModal;
