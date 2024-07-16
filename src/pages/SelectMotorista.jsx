import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import motoristas from "../data/motoristas.json";
import InputDropdownKm from "../components/InputDropdownKm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../css/menu.module.css"; // Importe o arquivo CSS Module

const SelectMotoristaVeiculo = () => {
  const [motoristaValue, setMotoristaValue] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placa, setPlaca] = useState(""); // Estado para armazenar a placa
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlaca = localStorage.getItem("selectedPlaca");
    const storedMotorista = localStorage.getItem("selectedMotorista");
    if (storedPlaca) {
      setPlaca(storedPlaca);
    }
    if (storedMotorista) {
      setMotoristaValue(storedMotorista);
    }
  }, []); // Executa apenas uma vez ao montar o componente

  const handleSubmit = () => {
    if (motoristaValue) {
      localStorage.setItem("selectedMotorista", motoristaValue);
      const rota = localStorage.getItem("selectedRota");
      if (rota === "rota") {
        navigate(`/rota/${placa}`);
      } else if (rota === "abastecimento") {
        navigate(`/abastecimento/${placa}`);
      }
    } else {
      setErrorMessage("Por favor, selecione um motorista.");
      setShowErrorModal(true);
    }
  };

  return (
    <div className={styles.menuPage}>
      <header className={styles.menuHeader}>
        <div className={styles.menuContainer}>
          <h1 className={styles.heading}>Selecione o Motorista</h1>
          <br />
          <p className={styles.subHeading}>{placa}</p>{" "}
          {/* Exibe a placa aqui */}
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.menuContainer}>
          <InputDropdownKm
            name=""
            value={motoristaValue}
            change={setMotoristaValue}
            items={motoristas}
            localStore={false}
            placeholder={true}
            placeholdertext="Selecione o Motorista"
          />

          <button
            className={`btn btn-primary ${styles.btnConfirm}`}
            onClick={handleSubmit}
          >
            Confirmar Motorista
          </button>
        </div>
      </div>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Erro!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectMotoristaVeiculo;