import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import veiculos from '../data/url.json';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../css/menu.module.css'; // Importando CSS Modules
import eletric from '../assets/images/Rota.jpg';
import hvac from '../assets/images/Abastecimento.jpg';
import logo from '../assets/images/logo/logo.png'; // Importando a imagem do logo

const Menu = () => {
  const { placa } = useParams();
  const motorista = localStorage.getItem('selectedMotorista');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!placa || !isValidPlaca(placa)) {
      navigate('/');
    }
  }, [placa, navigate]);

  const isValidPlaca = (placa) => {
    return veiculos.some((veiculo) => veiculo['veiculo/placa'] === placa);
  };

  const handlePlacaSubmit = (rota) => {
    const found = veiculos.find((veiculo) => {
      const veiculoPlaca = veiculo['veiculo/placa'];
      return veiculoPlaca.slice(-placa.length) === placa.slice(-placa.length);
    });

    if (found) {
      localStorage.setItem('selectedPlaca', found['veiculo/placa']);
      localStorage.setItem('selectedRota', rota);
      navigate('/motorista');
    } else {
      setErrorMessage('Placa não encontrada.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className={styles.menuPage}>
      <header className={styles.menuHeader}>
        <div className={styles.menuContainer}>
          <h2 className={styles.heading}><span> Selecione uma Opção</span></h2>
          {/* <p className={styles.subHeading}>Motorista: {motorista}</p> */}
          <p className={styles.subHeading}>{placa}</p>
        </div>
      </header>
      <article className={styles.content}>
        <div className={styles.menuContainer}>
          <div className={styles.cards}>
            <div className={styles.card} onClick={() => handlePlacaSubmit('rota')}>
              <img src={eletric} alt="Rota" className={styles.uiPreview} />
              <div className={styles.uiDetails}>
                <h4>Rota</h4>
              </div>
            </div>
            <div className={styles.card} onClick={() => handlePlacaSubmit('abastecimento')}>
              <img src={hvac} alt="Abastecimento" className={styles.uiPreview} />
              <div className={styles.uiDetails}>
                <h4>Abastecimento</h4>
              </div>
            </div>
          </div>
        </div>
      </article>

      <footer className={styles.footer}>
        <div className={styles.menuContainer}>
          <div className={styles.menuGithubLogo}>
            <a href="">
              <img src={logo} alt="Github Logo" />
            </a>
          </div>
        </div>
      </footer>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Erro!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
