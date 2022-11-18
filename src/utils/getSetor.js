import setor from '../data/setores.json';

const getSetor = (unidade) => {
  switch (unidade) {
    case '':
      return ['Selecione a unidade primeiro'];

    case '2.2 - CMS HÉLIO PELLEGRINO (0807)':
      return setor.hp220807;

    case '2.2 - CMS NILZA ROSA (FORMIGA) (0807)':
      return setor.nr220807;

    case '3.1 - CF ADIB JATENE (0808)':
      return setor.aj310808;

    case '3.1 - CF ALOYSIO AUGUSTO NOVIS (0808)':
      return setor.aan310808;

    case '3.1 - CF ASSIS VALENTE (0808)':
      return setor.av310808;

    case '3.1 - CF AUGUSTO BOAL (0808)':
      return setor.ab310808;

    case '3.1 - CF EIDIMIR THIAGO DE SOUZA (0808)':
      return setor.ets310808;

    case '3.1 - CF HEITOR DOS PRAZERES (0808)':
      return setor.hdp310808;

    case '3.1 - CF JOAOSINHO TRINTA (0808)':
      return setor.jt310808;

    case '3.1 - CF MARIA SEBASTIANA DE OLIVEIRA (0808)':
      return setor.mso310808;

    case '3.1 - CF NILDA CAMPOS DE LIMA (0808)':
      return setor.ncdl310808;

    case '3.1 - CF WILMA COSTA (0808)':
      return setor.wc310808;

    case '3.1 - CF ZILDA ARNS (0808)':
      return setor.za310808;

    case '3.1 - CMS JOSÉ BREVES DOS SANTOS (0808)':
      return setor.jbds310808;

    case '3.1 - CMS MADRE TERESA DE CALCUTÁ (0808)':
      return setor.mtdc310808;

    case '3.1 - CMS NAGIB JORGE FARAH (0808)':
      return setor.njf310808;

    case '3.1 - CMS NECKER PINTO (0808)':
      return setor.np310808;

    case '3.1 - CMS POLICLINICA JOSÉ PARANHOS FONTENELLE (0808)':
      return setor.pjpf310808;

    case '3.1 - CMS VILA DO JOÃO (0808)':
      return setor.vdj310808;

    case 'TEIAS - CF VICTOR VALLA (0810)':
      return setor.vvteias0810;

    case 'TEIAS - CSE GERMANO SINAL FARIA (0810)':
      return setor.gsfteias0810;

    case '5.2 - CF AGENOR DE MIRANDA [CAZUZA] (0809)':
      return setor.admc0809;

    case '5.2 - CF ALKINDAR SOARES PERREIRA FILHO (0809)':
      return setor.aspf0809;

    case '5.2 - CF ANA GONZAGA (0809)':
      return setor.ag0809;

    case '5.2 - CF ARTHUR ZANETTI (0809)':
      return setor.az0809;

    case '5.2 - CF BRUNO SCHIMIDT (0809)':
      return setor.bs0809;

    case '5.2 - CF DALMIR DE ABREU SALGADO (0809)':
      return setor.das0809;

    case '5.2 - CF EVERTON DE SOUZA  SANTOS (0809)':
      return setor.ess0809;

    case '5.2 - CF HANS JURGEN FERNANDO DOHMANN (0809)':
      return setor.hjfd0809;

    case '5.2 - CF ISABELA SEVERO DA SILVA (0809)':
      return setor.iss0809;

    case '5.2 - CF LECY RANQUINE (0809)':
      return setor.lr0809;

    case '5.2 - CF VALDECIR SALUSTIANO (0809)':
      return setor.vs0809;

    case '5.2 - CMS ADÃO PEREIRA NUNES (0809)':
      return setor.apn0809;

    case '5.2 - CMS AGUIAR TORRES (0809)':
      return setor.at0809;

    case '5.2 - CMS ALVIMAR DE CARVALHO (0809)':
      return setor.adc0809;

    case '5.2 - CMS BELIZÁRIO PENNA (0809)':
      return setor.bp0809;

    case '5.2 - CMS DR JOSÉ DE PAULA LOPES PONTES (0809)':
      return setor.djplp0809;

    case '5.2 - CMS DR OSWALDO VILELLA (0809)':
      return setor.dov0809;

    case '5.2 - CMS EDGARD MAGALHÃES (0809)':
      return setor.em0809;

    case '5.2 - CMS GARFIELD DE ALMEIDA (0809)':
      return setor.gda0809;

    case '5.2 - CMS MAIA BITTENCOURT (0809)':
      return setor.mb0809;

    case '5.2 - CMS MANOEL DE ABREU (0809)':
      return setor.ma0809;

    case '5.2 - CMS MARIO RODRIGUES CID (0809)':
      return setor.mrc0809;

    case '5.2 - CMS MÁRIO VITOR DE ASSIS PACHECO (0809)':
      return setor.mvdap0809;

    case '5.2 - CMS RAUL BARROSO (0809)':
      return setor.rb0809;

    case '5.2 - CMS VILA DO CÉU (0809)':
      return setor.vc0809;

    default:
      return ['NÃO HÁ SETORES DISPONÍVEIS!'];
  }
};

export default getSetor;
