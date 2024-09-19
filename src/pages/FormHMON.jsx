import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import EquipModal from "../components/EquipModal";

import submitForm from "../utils/submitForm";

import { ENTRY_HMON as entry, HMON_URI } from "../config/strings";
import getMateriais from "../utils/getMateriais";
import returnMails from "../utils/returnMails";
import Loading from "../components/Loading";

import AppContext from "../context/AppContext";

import logo from "../assets/images/logo/logo.png"; // Importando a imagem do logo

function FormHMON() {
  const { materialList, setMaterialList } = useContext(AppContext);

  const cc5 = localStorage.getItem("cc4");
  const cc4 = cc5.slice(0, 4);
  const type4 = localStorage.getItem("type4");

  const [modalShow, setModalShow] = useState(false);
  const [materiaisValue, setMateriaisValue] = useState([
    {
      tag: "0000",
      name: "0000",
      unidade: "UN",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMateriaisModal = async () => {
    await setIsLoading(true);
    const materiaisF = await getMateriais(type4);
    setMateriaisValue(materiaisF);
    setIsLoading(false);
  };

  const columns = ["TAG", "DESCRIÇÃO"];

  const getSmNumber = async () => {
    const { data } = await axios.get(
      `http://rradar.com.br:8000/contador/${type4}`
    );
    console.log("sm [ OK! ]", await data);
    return data;
  };

  const sendMail = async (smNN) => {
    const newList = materialList.map((d) => {
      return {
        tag: d.tag,
        description: d.name,
        quantity: d.quantidade,
        un: d.unidade,
        obs: d.obs,
        cc: '["monteiro@monteiroinstalacoes.com.br", "logistica@monteiroinstalacoes.com.br"]',
      };
    });
    console.log("new list =>", newList);

    await axios.post("http://rradar.com.br:7000/custom/sendmail", {
      type: type4,
      cost: cc4,
      number: await smNN,
      mails: returnMails(cc4),
      products: newList,
    });
  };

  const sendData = async () => {
    if (
      materialList === [] ||
      !materialList ||
      materialList === "" ||
      materialList.length === 0
    ) {
      console.log("A solicitação não pode estar vazia!");
      return alert("A solicitação não pode estar vazia!");
    }

    const url = HMON_URI;
    let smNumb = await getSmNumber();

    for (let i = 0; i < materialList.length; i++) {
      const dataToPost = new FormData();
      dataToPost.append(
        entry.cliente,
        `${cc4}-SM-${type4.slice(0, 3)}-${smNumb}`
      );
      dataToPost.append(entry.codigo, materialList[i].tag);
      dataToPost.append(entry.material, materialList[i].name);
      dataToPost.append(entry.setor, "HMON");
      dataToPost.append(entry.unid, materialList[i].unidade);
      dataToPost.append(entry.qtd, materialList[i].quantidade);
      dataToPost.append(entry.obs, materialList[i].obs);
      dataToPost.append(entry.status, "0. SOLICITADO");
      dataToPost.append("entry.1608830690", type4);
      dataToPost.append("entry.178058800", cc4);

      console.log(materialList[i].name);
      console.log(`post ${i} <=> data => ${materialList[i]}`);
      console.log(materialList[i]);

      submitForm(url, dataToPost);
    }

    await sendMail(smNumb);
    document.location.href = "/";

    if (navigator.onLine) {
      return alert("ENVIADO COM SUCESSO!");
    } else {
      return alert(
        "NÃO FOI POSSÍVEL ENVIAR, VERIFIQUE SUA CONEXÃO COM A INTERNET!"
      );
    }
  };

  const clearAllMaterials = () => {
    setMaterialList([]);
    localStorage.removeItem("materialList"); // Remove os dados salvos no localStorage
  };

  const clearAllMaterialsButton = () => {
    const confirmation = window.confirm(
      "Tem certeza de que deseja limpar todos os itens da lista?"
    );
    if (confirmation) {
      setMaterialList([]);
      localStorage.removeItem("materialList"); // Remove os dados salvos no localStorage
    }
  };

  const removeMaterial = (tagg) => {
    setMaterialList(materialList.filter((info) => info.tag !== tagg));
  };

  const addMaterialQuantity = (itemId) => {
    setMaterialList((prevList) => {
      const index = prevList.findIndex((info) => info.id === itemId);
  
      if (index !== -1) {
        const updatedItem = {
          ...prevList[index],
          quantidade: Number(prevList[index].quantidade) + 1,
        };
  
        const updatedList = [
          ...prevList.slice(0, index),
          updatedItem,
          ...prevList.slice(index + 1),
        ];
  
        // Atualiza o localStorage com a nova lista e a quantidade atualizada
        const storedItems = JSON.parse(localStorage.getItem('materiais')) || [];
        const itemInStorageIndex = storedItems.findIndex(
          (storedItem) => storedItem.id === itemId
        );
  
        if (itemInStorageIndex !== -1) {
          storedItems[itemInStorageIndex] = updatedItem; // Atualiza a quantidade no localStorage
        } else {
          storedItems.push(updatedItem); // Adiciona o item ao localStorage caso não exista
        }
  
        localStorage.setItem('materiais', JSON.stringify(storedItems));
  
        return updatedList;
      }
  
      return prevList;
    });
  };
  
  const removeMaterialQuantity = (itemId) => {
    setMaterialList((prevList) => {
      const index = prevList.findIndex((info) => info.id === itemId);
  
      if (index !== -1) {
        const item = prevList[index];
  
        // Checa se a quantidade é menor ou igual a 1
        if (item.quantidade <= 1) {
          if (window.confirm("Tem certeza de que deseja remover este item?")) {
            // Remove o item do localStorage
            const storedItems = JSON.parse(localStorage.getItem('materiais')) || [];
            const updatedStoredItems = storedItems.filter((storedItem) => storedItem.id !== itemId);
  
            // Atualiza o localStorage
            if (updatedStoredItems.length === 0) {
              localStorage.removeItem('materialList'); // Limpa o localStorage se não houver mais itens
            } else {
              localStorage.setItem('materialList', JSON.stringify(updatedStoredItems));
            }
  
            // Remove o item da lista
            const updatedList = [...prevList.slice(0, index), ...prevList.slice(index + 1)];
            
            return updatedList.length === 0 ? [] : updatedList;
          }
        } else {
          // Atualiza a quantidade do item
          return [
            ...prevList.slice(0, index),
            { ...item, quantidade: item.quantidade - 1 },
            ...prevList.slice(index + 1),
          ];
        }
      }
  
      return prevList;
    });
  };
  

  const renderTable = () => {
    if (materialList.length !== 0) {
      const table = materialList.map((item) => (
        <tr key={item.id}>
          <td className="small">{item.tag}</td>
          <td className="small">{item.name}</td>
          <td className="small">{item.quantidade}</td>
          <td>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
              <Button
                className="btn-sm mb-2 mb-sm-0 me-sm-2 w-100 w-sm-auto"
                variant="success"
                onClick={() => addMaterialQuantity(item.id)}
              >
                <i className="bi bi-plus-lg"></i>
              </Button>
              <Button
                className="btn-sm w-100 w-sm-auto"
                variant="danger"
                onClick={() => removeMaterialQuantity(item.id)}
              >
                <i className="bi bi-dash-lg"></i>
              </Button>
            </div>
          </td>
        </tr>
      ));
      return table;
    }

    const message = (
      <tr>
        <td colSpan="4">Não há nenhum item na lista</td>
      </tr>
    );
    return message;
  };

  useEffect(() => {
    loadMateriaisModal();
  }, []);
  useEffect(() => console.log(materialList));

  useEffect(() => {
    if (materialList.length > 0) {
      // Obtém o type4 atual
      const type4 = localStorage.getItem("type4");

      // Salva materialList e type4 no localStorage
      localStorage.setItem(
        "materialList",
        JSON.stringify({
          type4: type4,
          list: materialList,
        })
      );
    }
  }, [materialList]);

  useEffect(() => {
    loadMateriaisModal();

    // Recupera os dados do localStorage quando o componente é montado
    const savedData = localStorage.getItem("materialList");

    if (savedData) {
      const { type4: savedType4, list: savedMaterialList } =
        JSON.parse(savedData);
      const currentType4 = localStorage.getItem("type4");

      // Verifica se o type4 salvo corresponde ao type4 atual
      if (savedType4 === currentType4) {
        setMaterialList(savedMaterialList);
      }
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-center"> 
    {/* style={{ backgroundColor: '#1F1F1F', color: '#1F1F1F' }} */}
      <nav className="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between align-items-center px-3">
        <div className="container-fluid">
          {/* Botão Voltar dentro da Navbar */}
          <Button
            variant="dark" // Botão estilo secundário
            active
            type="button"
            className="btn btn-dark me-2" // Margem à direita para espaçamento
            onClick={(e) => {
              e.preventDefault();
              const confirmation = window.confirm(
                "Deseja realmente voltar para o Menu?"
              );

              if (confirmation) {
                window.location.href = "/"; // Redireciona para a tela inicial se o usuário confirmar
              }
            }}
          >
            {/* Ícone adicionado usando o Bootstrap */}
            <i className="bi bi-house-fill"></i>
          </Button>
          {/* Navbar Brand */}
          <img
            src={logo}
            alt="Logo"
            style={{ height: "30px" }}
            // onClick={() => navigate("/menu_gestor")}
          />

          {/* Toggle para mobile */}
          {/* <button */}
          {/* className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    > */}
          {/* <span className="navbar-toggler-icon"></span> */}
          {/* </button> */}

          {/* Links da Navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  Sobre
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contato
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      <br />
      <EquipModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
        table={materiaisValue}
      />
      <label
        htmlFor="material"
        className="block table-responsive-sm table-material"
      >
                <p />
                <p />
                <p />
        <span className="text-center">{`${cc4}-SM-${type4}`}</span>
        <p />
        <table className="table table-striped table-dark w-100">
          <thead className="small">
            <tr>
              <td>TAG</td>
              <td>DESCRIÇÃO</td>
              <td>QUANTIDADE</td>
              <td><i class="bi bi-pencil-square"></i></td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </label>
     <div className="d-flex flex-column align-items-center">
     <Button
       variant="outline-warning"
       className="w-50 mt-4 mb-4"
       onClick={() => setModalShow(true)}
     >
       <i className="bi bi-database-fill-add"></i> Selecionar Item
     </Button>
     <Button
       variant="danger"
       className="w-50 mb-5"
       onClick={clearAllMaterialsButton}
     >
      <i className="bi bi-trash3-fill"></i>  Limpar Tudo  
     </Button>
     <Button
       variant="primary"
      //  active
       type="submit"
       value="Submit"
       className="w-100 py-3 mb-3"
       onClick={(e) => {
         e.preventDefault();
         const confirmation = window.confirm("Deseja realmente enviar os dados ou quer revisar?");
         if (confirmation) {
           sendData();
           clearAllMaterials();
         }
       }}
     >
       <i className="bi bi-send-fill"></i> Enviar
     </Button>
   </div>
   </div>
  );
}

export default FormHMON;
