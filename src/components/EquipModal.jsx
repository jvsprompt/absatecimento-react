import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import AppContext from "../context/AppContext";

import "../css/EquipModal.css";

function EquipModal(props) {
  const { materialList, setMaterialList } = useContext(AppContext);
  const table = props.table;

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    tag: "",
    name: "",
    unidade: "",
  });

  const [filteredData, setFilteredData] = useState(table);
  const [searchInput, setSearchInput] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [obsValue, setObsValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const removeSelectedClass = () => {
    const selectedClass = document.querySelector(".selected");
    if (selectedClass) {
      selectedClass.classList.remove("selected");
    }
  };

  const selectedI = async (event) => {
    const selected = event.target;
    removeSelectedClass();
    selected.parentNode.classList.add("selected");

    const findMaterial = props.table.find((data) => {
      const s = selected.parentNode.innerText.split("	");
      return data.tag === s[0];
    });
    setSelectedItem(findMaterial);
  };

  const updateSearch = (e) => {
    const searchNormalize = searchInput
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const filter = table.filter(
      ({ name, tag }) =>
        name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(searchNormalize) ||
        tag.includes(searchNormalize) ||
        tag.includes('99999')
    );
    setFilteredData(filter);
  };

  const { id, tag, name, unidade } = selectedItem;

  const restoreDefaultValues = () => {
    setSearchInput("");
    setObsValue("");
    setQuantidade("");
    setSelectedItem({
      id: "",
      tag: "",
      name: "",
      unidade: "",
    });
  };

  const validateData = () => {
    if (!quantidade || quantidade === "" || quantidade === "0") {
      alert("Campo de quantidade deve ser preenchido!");
      return false;
    }

    if (!selectedItem.name || selectedItem.name === "") {
      alert("Campo de Descrição deve ser preenchido!");
      return false;
    }
    return true;
  };

  const pushMaterial = () => {
    const validate = validateData();
  
    if (!validate) {
      return;
    }
  
    const type4 = localStorage.getItem("type4"); // Obtém o type4 do localStorage ou de onde estiver disponível
    
    const newItem = {
      id: Date.now(), // Usando timestamp para garantir ID único
      name: selectedItem.name,
      quantidade: quantidade || '0',
      tag: selectedItem.tag,
      unidade: selectedItem.unidade,
      obs: obsValue || '',
      type4: type4 // Adiciona o type4 aos dados
    };
  
    if (selectedItem.tag === '99999') {
      // Permite múltiplas adições para a tag '99999'
      setMaterialList(prevList => [...prevList, newItem]);
      restoreDefaultValues();
      return;
    }
  
    // Verificar se o item com a mesma TAG já está na lista
    const tagExists = materialList.some(
      (item) => item.tag === selectedItem.tag
    );
  
    if (tagExists) {
      alert("Este item já foi adicionado!");
      return;
    }
  
    setMaterialList(prevList => [...prevList, newItem]);
    restoreDefaultValues();
  };
  

  useEffect(() => {
    updateSearch();
  }, [searchInput]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form.Group className="mb-3 search-input modal-input">
          <Form.Control
            type="text"
            placeholder="Pesquisa"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
          />
        </Form.Group>
        <table className="table modal-table">
          <thead>
            <tr>
              {props.columns.map((data, i) => (
                <th key={i}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr onClick={selectedI} key={data.id}>
                <td>{data.tag}</td>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Form>
          <Form.Group className="mb-3 tag-input modal-input">
            <Form.Label>TAG</Form.Label>
            <Form.Control type="text" placeholder=" " value={tag} readOnly />
          </Form.Group>
          <Form.Group className="mb-3 tag-input modal-input">
            <Form.Label>QUANTIDADE</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 tag-input modal-input">
            <Form.Label>UNIDADE</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={unidade}
              onChange={(e) => {
                if (tag === "99999") {
                  setSelectedItem({
                    id,
                    tag,
                    name,
                    quantidade,
                    unidade: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 modal-input">
            <Form.Label>DESCRIÇÃO</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => {
                if (tag === "99999") {
                  setSelectedItem({
                    id,
                    tag,
                    name: e.target.value.toUpperCase(),
                    quantidade,
                    unidade,
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 modal-input">
            <Form.Label>OBSERVAÇÃO</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={obsValue}
              onChange={(e) => setObsValue(e.target.value.toUpperCase())}
            />
          </Form.Group>
        </Form>
        <label htmlFor="continuar">
          <input
            type="checkbox"
            id="continuar"
            name="continuar"
            value="continuar"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          {" Continuar Incluindo"}
        </label>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
        <Button
          className="mb-2 mb-sm-0 me-sm-2 w-100 w-sm-auto"
          onClick={() => {
            if (isChecked) {
              pushMaterial();
            } else {
              pushMaterial();
              props.onHide();
            }
          }}
        >
          Selecionar
        </Button>
        <Button
          variant="danger"
          className="w-100 w-sm-auto"
          onClick={() => {
            props.onHide();
            restoreDefaultValues();
          }}
        >
          <span className="cancel-button">Cancelar</span>
        </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EquipModal;
