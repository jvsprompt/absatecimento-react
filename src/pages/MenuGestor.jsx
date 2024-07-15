import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../css/menu.module.css'; // Importando CSS Modules
import eletric from '../assets/images/Manutencao.jpg';
import hvac from '../assets/images/Documentos.jpg';
import logo from '../assets/images/logo/logo.png'; // Importando a imagem do logo

const Menu = () => {
  const motorista = localStorage.getItem('selectedMotorista');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePlacaSubmit = (rota) => {
    if (rota === 'manutencao') {
      navigate('/manutencao');
    } else if (rota === 'documentos') {
      navigate('/documentos');
    } else {
      setErrorMessage('Opção inválida.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className={styles.menuPage}>
      <header className={styles.menuHeader}>
        <div className={styles.menuContainer}>
          <h2 className={styles.heading}><span>Selecione uma Opção</span></h2>
          {/* <p className={styles.subHeading}>Motorista: {motorista}</p> */}
        </div>
      </header>
      <article className={styles.content}>
        <div className={styles.menuContainer}>
          <div className={styles.cards}>
            <div className={styles.card} onClick={() => handlePlacaSubmit('manutencao')}>
              <img src={eletric} alt="Manutenção" className={styles.uiPreview} />
              <div className={styles.uiDetails}>
                <h4>Manutenção</h4>
              </div>
            </div>
            <div className={styles.card} onClick={() => handlePlacaSubmit('documentos')}>
              <img src={hvac} alt="Documentos" className={styles.uiPreview} />
              <div className={styles.uiDetails}>
                <h4>Documentos</h4>
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
