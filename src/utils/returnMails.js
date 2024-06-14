const returnMails = (cc4) => {
  if (cc4 === '0621') {
    return [
      'pcm@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
    ];
  }

  if (
    cc4 === '0797' ||
    cc4 === '0807' ||
    cc4 === '0808' ||
    cc4 === '0809' ||
    cc4 === '0810'
  ) {
    return [
      'suporte.pcm@monteiroinstalacoes.com.br',
      'analista.pcm@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'coordenador@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0811') {
    return [
      'coordenador@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0816') {
    return [
      'obras@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'obra.cffc@monteiroinstalacoes.com.br',
      'coordenador@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0818') {
    return [
      'suporte.pcm@monteiroinstalacoes.com.br',
      'analista.pcm@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'coordenador@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0822') {
    return [
      'manutencao.coppead@monteiroinstalacoes.com.br',
      'coordenador@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'suporte.pcm@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0823') {
    return [
      'obra.hmas@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0824' || cc4 === '0825') {
    return [
      'obra.cmspn@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0828' || cc4 === '0839') {
    return [
      'coordenador@monteiroinstalacoes.com.br',
      'gerente@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'suporte.pcm@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0000') {
    return [
      'rh@monteiroinstalacoes.com.br',
      'atendimento.rh@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0829') {
    return [
      'coordenador@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
    ];
  }

  if (cc4 === '0831' || cc4 === '0838' || cc4 === '0840' || cc4 === '0841') {
    return [
      'coordenador@monteiroinstalacoes.com.br',
      'monteiro@monteiroinstalacoes.com.br',
      'logistica@monteiroinstalacoes.com.br',
      'suporte.pcm@monteiroinstalacoes.com.br',
    ];
  }

  return ['logistica@monteiroinstalacoes.com.br', 'gerente@monteiroinstalacoes.com.br',
    'monteiro@monteiroinstalacoes.com.br',];

};

export default returnMails;
