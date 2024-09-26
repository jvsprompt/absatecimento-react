import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, handleConfirm, message }) => {
  const handleConfirmAndClose = () => {
    handleConfirm();  // Executa a ação de confirmação
    handleClose();    // Fecha o modal após a confirmação
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modal-light">
      <Modal.Header closeButton className="bg-light text-black">
        <Modal.Title>Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-black">{message}</Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirmAndClose}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
