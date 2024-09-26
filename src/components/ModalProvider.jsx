import React, { createContext, useContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import AlertModal from "./AlertModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = (modalType, props) => {
    setModal({ modalType, props, show: true });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && (
        <>
          {modal.modalType === "confirm" && (
            <ConfirmModal
              show={modal.show}
              {...modal.props}
              handleClose={closeModal}
              handleConfirm={async () => {
                if (modal.props.handleConfirm) {
                  await modal.props.handleConfirm();
                }
                // closeModal(); // Fecha o modal após a confirmação
              }}
            />
          )}
          {modal.modalType === "alert" && (
            <AlertModal
              show={modal.show}
              title={modal.props.title} // Passando o título
              message={modal.props.message} // Passando a mensagem
              handleClose={closeModal}
            />
          )}
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);