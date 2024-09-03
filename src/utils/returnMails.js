const returnMails = (cc4) => {
  const commonMails = [
    "monteiro@monteiroinstalacoes.com.br",
    "logistica@monteiroinstalacoes.com.br",
  ];

  switch (cc4) {
    case "0000":
      return [
        "rh@monteiroinstalacoes.com.br",
        "atendimento.rh@monteiroinstalacoes.com.br",
        ...commonMails,
      ];

    case "0621":
      return ["pcm@monteiroinstalacoes.com.br", ...commonMails];

    case "0816":
      return [
        "obras@monteiroinstalacoes.com.br",
        "obra@monteiroinstalacoes.com.br",
        "obra.cffc@monteiroinstalacoes.com.br",
        "coordenador@monteiroinstalacoes.com.br",
        ...commonMails,
      ];

    case "0822":
      return [
        "manutencao.coppead@monteiroinstalacoes.com.br",
        "coordenador@monteiroinstalacoes.com.br",
        "suporte.pcm@monteiroinstalacoes.com.br",
        ...commonMails,
      ];

    case "0823":
      return ["obra.hmas@monteiroinstalacoes.com.br", ...commonMails];

    case "0824":
    case "0825":
      return ["obra.cmspn@monteiroinstalacoes.com.br", ...commonMails];

    case "0829":
    case "0846":
      return ["coordenador@monteiroinstalacoes.com.br", ...commonMails];

    case "0842":
    case "0844":
    case "0845":
      return commonMails;

    case "0849":
    case "0851":
      return [
        "coordenador@monteiroinstalacoes.com.br",
        "obra@monteiroinstalacoes.com.br",
        "suporte.pcm@monteiroinstalacoes.com.br",
        ...commonMails,
      ];

    default:
      return [
        "coordenador@monteiroinstalacoes.com.br",
        "suporte.pcm@monteiroinstalacoes.com.br",
        ...commonMails,
      ];
  }
};

export default returnMails;
