import React from 'react';
import PropTypes from 'prop-types';

const messages = {
  1: 'A lista de materiais está vazia!',
  2: 'Dados enviados com sucesso!',
  3: 'Tem certeza que deseja remover este material?',
  4: 'Tem certeza que deseja voltar para a página inicial?',
  5: 'Tem certeza que deseja enviar os dados ou deseja revisar?',
  6: 'O item já foi adicionado à lista!',
  7: 'O campo de quantidade deve ser preenchido!',
  8: 'O campo de descrição deve ser preenchido!',
  9: 'Erro de conexão, verifique sua internet!',
  10: 'Digite o seu nome completo!',
};

const StandardMessages = ({ messageType }) => {
  return messages[messageType] || 'Mensagem padrão! Nenhuma ação definida.';
};

StandardMessages.propTypes = {
  messageType: PropTypes.number.isRequired,
};

export default StandardMessages;