import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import InputTextKm from "../components/InputTextKm";
import InputNumberKm from "../components/InputNumberKm";
import InputDropdownKm from "../components/InputDropdownKm";
import InputDate from "../components/InputDate";
import InputValorKm from "../components/InputValorKm";
// import InputTextArea from "../components/InputTextArea";

import submitFormv2 from "../utils/submitFormv2";

import manutencao from "../data/tipomanutencao.json";
import veiculos from "../data/veiculos.json";
import preventiva from "../data/preventiva.json";
import fornecedor from "../data/fornecedores.json";
import URL_Return from "../data/url.json";

import logo from "../assets/images/logo/logo.png"; // Importando a imagem do logo

function FormMaintenance() {
  const user = "GESTOR";
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(true);
  const [localValue, setLocalValue] = useState("");
  const [tipoValue, setTipoValue] = useState("");
  const [kmValue, setKmValue] = useState("");
  const [placaValue, setPlacaValue] = useState("");
  const [combustivelValue, setCombustivelValue] = useState("");
  const [valormValue, setValormValue] = useState("");
  const [valorsValue, setValorsValue] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [lastTipo, setLastTipo] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalLocked, setModalLocked] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialDataLength, setInitialDataLength] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [dateValue, setDateValue] = useState(new Date()); // Estado para a data selecionada

  useEffect(() => {
    setInitialDataLength(data.length);
  }, [data]);

  useEffect(() => {
    initializeStates();
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const urlItem = URL_Return.find((item) => item["veiculo/placa"] === user);
      const response = await axios.get(urlItem.urlb);
      console.log("get vehicles response =>", response);
  
      // Ordena os dados pela data em ordem decrescente
      const sortedData = response.data.sort(
        (a, b) =>
          new Date(b["Carimbo de data/hora"]) - new Date(a["Carimbo de data/hora"])
      ).reverse(); 
  
      // Pega apenas os 3 primeiros itens
      const last3Data = sortedData.slice(0, 3);
  
      setData(last3Data);
      setTableData(last3Data);
      console.log("vehicles data =>", last3Data);
      setLoading(false);
  
      if (last3Data.length > 0) {
        const mostRecentLocal = last3Data[0].LOCAL;
        const secondMostRecentLocal = last3Data[1]?.LOCAL || "";
        const mostRecentKm = last3Data[0].KM;
        setLocalValue(
          mostRecentLocal === secondMostRecentLocal ? "" : mostRecentLocal
        );
        setKmValue(mostRecentKm.substring(0, 3));
        setLastTipo(last3Data[0].TIPO);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  

  const initializeStates = () => {
    const found = URL_Return.find(
      (veiculo) => veiculo["veiculo/placa"] === user
    );

    // if (!found) {
    //   setErrorMessage("PLACA INVÁLIDA! VERIFIQUE SEU ENDEREÇO ESTÁ CORRETO.");
    //   setShowErrorModal(true);
    //   setShowForm(false);
    // }
  };

  const restoreDefaultValues = () => {
    setPlacaValue("");
    setDateValue(dataAtual);
    setKmValue("");
    setTipoValue("");
    setLocalValue("");
    setCombustivelValue("");
    setValormValue("");
    setValorsValue("");
  };

  const sendData = () => {
    let urlItem;

    for (let i = 0; i < URL_Return.length; i++) {
      if (URL_Return[i]["veiculo/placa"] === user) {
        urlItem = URL_Return[i];
        break;
      }
    }

    if (urlItem) {
      const URIB = urlItem.urib;
      const LOCAL = urlItem.obs;
      const VALORS = urlItem.tipo;
      const KM = urlItem.km;
      const PLACA = urlItem.veiculo;
      const MOTORISTA = urlItem.motorista;
      const DATA = urlItem.data;
      const COMBUSTIVEL = urlItem.combustivel;
      const VALORM = urlItem.local;

      if (
        tipoValue &&
        kmValue &&
        user &&
        placaValue &&
        dateValue &&
        combustivelValue &&
        valormValue &&
        valorsValue
      ) {
        if (kmValue.length < 6) {
          setErrorMessage("O valor de KM deve ter pelo menos 6 dígitos.");
          setShowErrorModal(true);
          return;
        }

        // const last8Digits = user.substring(user.length - 8);

        // Verificar se o KM é maior ou igual ao mais recente na tabela
        if (tableData.length > 0) {
          const mostRecentKm = parseInt(tableData[0].KM);
          if (parseInt(kmValue) < mostRecentKm) {
            setErrorMessage(
              "O valor de KM não pode ser menor que o valor mais recente."
            );
            setShowErrorModal(true);
            return;
          }
        }

        // Formatar a data como DAY/MM/YYYY
        const formattedDate = `${diaDoMes.toString().padStart(2, "0")}/${(
          dataAtual.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${anoAtual}`;

        const dataToPost = new FormData();
        dataToPost.append(LOCAL, localValue);
        // dataToPost.append(TIPO, tipoValue);
        dataToPost.append(KM, kmValue);
        dataToPost.append(PLACA, placaValue);
        dataToPost.append(MOTORISTA, tipoValue);
        dataToPost.append(DATA, formattedDate); // Enviar a data formatada
        dataToPost.append(COMBUSTIVEL, combustivelValue);
        dataToPost.append(VALORM, valormValue);
        dataToPost.append(VALORS, valorsValue);

        const newEntry = {
          "Carimbo de data/hora": new Date().toLocaleString(),
          // TIPO: tipoValue,
          PLACA: placaValue,
          DATA: formattedDate,
          KM: kmValue,
          "TIPO (MANUTENÇÃO)": tipoValue,
          DESCRIÇÃO: localValue,
          FORNECEDOR: combustivelValue,
          "VALOR MATERIAL": valormValue,
          "VALOR SERVIÇO": valorsValue,
        };

        setData([newEntry, ...data]);
        console.log("Novo registro:", newEntry);
        setTableData([newEntry, ...tableData]);
        // setLastTipo(tipoValue);

        submitFormv2(URIB, dataToPost);

        restoreDefaultValues();

        if (navigator.onLine) {
          setModalLocked(true);
          setDataUpdated(true);
        } else {
          setErrorMessage(
            "NÃO FOI POSSÍVEL ENVIAR, VERIFIQUE SUA CONEXÃO COM A INTERNET!"
          );
          setShowErrorModal(true);
        }
      } else {
        setErrorMessage("POR FAVOR, PREENCHA TODOS OS CAMPOS ANTES DE ENVIAR.");
        setShowErrorModal(true);
      }
    }
  };

  const diasDaSemana = [
    "DOMINGO",
    "SEGUNDA-FEIRA",
    "TERÇA-FEIRA",
    "QUARTA-FEIRA",
    "QUINTA-FEIRA",
    "SEXTA-FEIRA",
    "SÁBADO",
  ];

  const mesesDoAno = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ];

  const dataAtual = new Date();
  const diaDaSemana = diasDaSemana[dataAtual.getDay()];
  const diaDoMes = dataAtual.getDate();
  const mesAtual = mesesDoAno[dataAtual.getMonth()];
  const anoAtual = dataAtual.getFullYear();
  const dataFormatada = `${diaDaSemana}, ${diaDoMes} DE ${mesAtual.toUpperCase()} DE ${anoAtual}`;

  const handleFinalModalClose = () => {
    setShowFinalModal(false);
  };

  const handleNewModalClose = () => {
    setShowSuccessModal(false);
    setModalLocked(false);
  };

  useEffect(() => {
    if (data.length > initialDataLength) {
      setShowSuccessModal(false);
      setModalLocked(false);
    }
  }, [data, initialDataLength]);

  useEffect(() => {
    if (!showSuccessModal && dataUpdated) {
      setShowFinalModal(true);
      setDataUpdated(false);
    }
  }, [showSuccessModal, dataUpdated]);

  useEffect(() => {
    if (showFinalModal) {
      const timer = setTimeout(() => {
        setShowFinalModal(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [showFinalModal]);

  // useEffect(() => {
  //   const motorista = localStorage.getItem("selectedMotorista");
  //   if (motorista) {
  //     setplacaValue(motorista);
  //   }
  // }, []);

  return (
    <div className="form-group">
      <nav
        className="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between align-items-center px-3"
        style={{ marginTop: "0" }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "30px" }}
          onClick={() => navigate('/menu_gestor')}
        />
        <Button
          variant="secondary"
          className="menu-button"
          onClick={() => navigate('/menu_gestor')}
        >
          Menu
        </Button>
      </nav>
      <div className="">
        {showForm && (
          <div className="text-light text-center font-weight-bold">
            <div className="text-danger font-weight-bold">{user}</div>
            <div className="main-div">
              <InputDropdownKm
                name="PLACA"
                value={placaValue}
                change={setPlacaValue}
                items={veiculos}
                localStore={false}
                placeholder={true}
                placeholdertext="Selecione a placa"
              />
              <InputDate
                name="DATA"
                value={dateValue}
                change={setDateValue}
                localStore={false} // Para salvar no localStorage se necessário
                classN="input-date-class" // Adicione a classe desejada aqui
              />
              <InputNumberKm
                name="KM"
                value={kmValue}
                change={setKmValue}
                placeholder="Digite o KM"
                maxLen={6}
              />
              <InputDropdownKm
                name="TIPO (MANUTENÇÃO)"
                value={tipoValue}
                change={setTipoValue}
                items={manutencao}
                localStore={false}
                placeholder={true}
                placeholdertext="Selecione o tipo de manutenção"
              />
              <InputDropdownKm
                name="DESCRIÇÃO"
                value={localValue}
                change={setLocalValue}
                items={preventiva}
                localStore={false}
                placeholder={true}
                placeholdertext="Selecione o fornecedor"
              />
              <InputDropdownKm
                name="FORNECEDOR"
                value={combustivelValue}
                change={setCombustivelValue}
                items={fornecedor}
                localStore={false}
                placeholder={true}
                placeholdertext="Selecione o fornecedor"
              />
              <InputValorKm
                name="VALOR MATERIAL"
                value={valormValue}
                change={setValormValue}
                placeholder="Digite o valor do material"
                uppercase={true}
              />
              <InputValorKm
                name="VALOR SERVIÇO"
                value={valorsValue}
                change={setValorsValue}
                placeholder="Digite o valor do serviço"
                uppercase={true}
              />
            </div>
            {/* <div className="main-div">QUAL O TIPO?</div> */}
            <br />
            <div className="row justify-content-center">
              <div className="col-12 col-md mb-3">
                <Button
                  className="btn btn-primary btn-lg btn-block rounded-left font-weight-bold"
                  onClick={sendData}
                  // disabled={lastTipo === "VALE OLIVEIRENSE"}
                >
                  ENVIAR
                </Button>
              </div>
              {/* <div className="col-12 col-md mb-3">
                <Button
                  className="btn btn-primary btn-lg btn-block font-weight-bold"
                  onClick={() => sendData("REEMBOLSO DE RUA")}
                  // disabled={lastTipo === "REEMBOLSO DE RUA"}
                >
                  REEMBOLSO DE RUA
                </Button>
              </div> */}
              {/* <div className="col-12 col-md mb-3">
                <Button
                  className="btn btn-success btn-lg btn-block rounded-right font-weight-bold"
                  onClick={() => sendData("VR COMBUSTIVEL")}
                  // disabled={lastTipo === "VR COMBUSTIVEL"}
                >
                  VR COMBUSTIVEL
                </Button>
              </div> */}
            </div>
            <br />
            <br />
            <div className="text-success font-weight-bold">
              HISTÓRICO DE ENVIO:
            </div>
            <div className="text-light font-weight-bold">{dataFormatada}</div>
            <br />
            <div className="table-responsive-sm">
              {loading ? (
                <p>Carregando Tabela...</p>
              ) : (
                <table className="table table-striped table-dark w-100">
                  <thead className="small">
                    <tr>
                      <th>Data/Hora</th>
                      <th>Placa</th>
                      <th>Data</th>
                      <th>KM</th>
                      <th>TIPO</th>
                      <th>DESCRIÇÃO</th>
                      <th>FORNECEDOR</th>
                      <th>V.MATERIAL</th>
                      <th>V.SERVIÇO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((item, index) => (
                        <tr key={index}>
                          <td className="small">
                            {item["Carimbo de data/hora"]}
                          </td>
                          <td className="small">{item.PLACA}</td>
                          <td className="small">{item.DATA}</td>
                          <td className="small">{item.KM}</td>
                          <td className="small">{item["TIPO (MANUTENÇÃO)"]}</td>
                          <td className="small">{item.DESCRIÇÃO}</td>
                          <td className="small">{item.FORNECEDOR}</td>
                          <td className="small">{item["VALOR MATERIAL"]}</td>
                          <td className="small">{item["VALOR SERVIÇO"]}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">Nenhum registro encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showSuccessModal}
        onHide={handleNewModalClose}
        backdrop={true}
        keyboard={!modalLocked}
      >
        <Modal.Header closeButton={!modalLocked}>
          <Modal.Title style={{ color: "black" }}>
            Enviando dados...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          POR FAVOR, AGUARDE ALGUNS SEGUNDOS. <br /> NÃO FECHE OU ATUALIZE ESTA
          PÁGINA!
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={showFinalModal} onHide={handleFinalModalClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Enviado com sucesso!
          </Modal.Title>
        </Modal.Header>
      </Modal>

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
}

export default FormMaintenance