const returnMails = (cc4) => {
  if (cc4 === "0000") {
    return [
      "rh@monteiroinstalacoes.com.br",
      "atendimento.rh@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0621") {
    return [
      "pcm@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0816") {
    return [
      "obras@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
      "obra@monteiroinstalacoes.com.br",
      "obra.cffc@monteiroinstalacoes.com.br",
      "coordenador@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0822") {
    return [
      "manutencao.coppead@monteiroinstalacoes.com.br",
      "coordenador@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
      "suporte.pcm@monteiroinstalacoes.com.br",
    ];
  }
  if (cc4 === "0823") {
    return [
      "obra.hmas@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0824" || cc4 === "0825") {
    return [
      "obra.cmspn@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0829" || cc4 === "0846") {
    return [
      "coordenador@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0842" || cc4 === "0844" || cc4 === "0845") {
    return [
      "monteiro@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
    ];
  }

  if (cc4 === "0849" || cc4 === "0851") {
    return [
      "coordenador@monteiroinstalacoes.com.br",
      "logistica@monteiroinstalacoes.com.br",
      "monteiro@monteiroinstalacoes.com.br",
      "obra@monteiroinstalacoes.com.br",
      "suporte.pcm@monteiroinstalacoes.com.br",
    ];
  }

  //PADRÃO
  return [
    "coordenador@monteiroinstalacoes.com.br",
    "logistica@monteiroinstalacoes.com.br",
    "monteiro@monteiroinstalacoes.com.br",
    "suporte.pcm@monteiroinstalacoes.com.br",
  ];
};

export default returnMails;
