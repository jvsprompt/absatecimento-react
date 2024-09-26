// Bibliotecas Externas
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

// Componentes
import EquipModal from "../components/EquipModal";
import { useModal } from "../components/ModalProvider";
import StandardMessages from "../components/StandardMessages";
import Loading from "../components/Loading";

// Utilitários
import submitForm from "../utils/submitForm";
import getMateriais from "../utils/getMateriais";
import returnMails from "../utils/returnMails";

// Configurações
import { ENTRY_HMON as entry, HMON_URI } from "../config/strings";

// Contexto
import AppContext from "../context/AppContext";

// Imagens
import logo from "../assets/images/logo/logo.png"; // Importando a imagem do logo

function FormHMON() {
  const { materialList, setMaterialList } = useContext(AppContext);
  const { openModal } = useModal();
  const [solicitante, setSolicitante] = useState('');

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
    setIsLoading(true);
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
    const solicitante = localStorage.getItem('solicitante');
    
    const newList = materialList.map((d) => ({
      tag: d.tag,
      description: d.name,
      quantity: d.quantidade,
      un: d.unidade,
      obs: `${d.obs} - ${solicitante}`,
      cc: '["monteiro@monteiroinstalacoes.com.br", "logistica@monteiroinstalacoes.com.br"]',
    }));
  
    await axios.post("http://rradar.com.br:7000/custom/sendmail", {
      type: type4,
      cost: cc4,
      number: await smNN,
      mails: returnMails(cc4),
      products: newList,
    });
  };
  

  const sendData = async () => {

    // Verifica a conectividade antes de qualquer operação
    if (!navigator.onLine) {
      openModal("alert", {
        show: true,
        message: (
          <StandardMessages 
            messageType={9} // Mensagem de erro de conexão
          />
        ),
      });
      return; // Interrompe a execução se não houver conexão
    }

        // Verifica se a lista de materiais está vazia
        if (!(solicitante) || solicitante.length === 0) {
          openModal("alert", {
            show: true,
            message: (
              <StandardMessages 
                messageType={10} // Mensagem que diz que a lista está vazia 
              />
            ),
          });
          return;
        }
  
    // Verifica se a lista de materiais está vazia
    if (!Array.isArray(materialList) || materialList.length === 0) {
      openModal("alert", {
        show: true,
        message: (
          <StandardMessages 
            messageType={1} // Mensagem que diz que a lista está vazia 
          />
        ),
      });
      return;
    }
  
    // Abre o modal de confirmação
    openModal("confirm", {
      show: true,
      message: <StandardMessages messageType={5} />, // Mensagem de confirmação
      handleConfirm: async () => {
        const url = HMON_URI;
        let smNumb = await getSmNumber();
  
        // Faz o loop para enviar os materiais
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
  
          // Log para depuração
          console.log(`Enviando material: ${materialList[i].name}`);
  
          // Submete o formulário
          submitForm(url, dataToPost);
        }
  
        // Envia o e-mail
        await sendMail(smNumb);
  
        // Limpa a lista
        clearAllMaterials();
  
        // Exibe mensagem de sucesso após enviar todos os materiais
        openModal("alert", {
          show: true,
          message: (
            <StandardMessages 
              messageType={2} // Mensagem de sucesso de envio
            />
          )
        });
  
        // Redireciona após um breve atraso
        setTimeout(() => {
          document.location.href = "/";
        }, 2000); // Tempo para o usuário ver o modal antes do redirecionamento
      },
    });
  };
  
  

  const clearAllMaterialsButton = () => {

        // Verifica se a lista de materiais está vazia
        if (!Array.isArray(materialList) || materialList.length === 0) {
          openModal("alert", {
            show: true,
            message: (
              <StandardMessages 
                messageType={1} // Mensagem que diz que a lista está vazia 
              />
            ),
          });
          return; // Não abre o modal de confirmação se a lista estiver vazia
        }
        
    openModal("confirm", {
      show: true,
      message: <StandardMessages messageType={3} />,
      handleConfirm: () => {
        clearAllMaterials();
      },
    });
  };

  const clearAllMaterials = () => {
    setMaterialList([]);
    localStorage.removeItem("materialList");
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
        const storedItems = JSON.parse(localStorage.getItem("materiais")) || [];
        const itemInStorageIndex = storedItems.findIndex(
          (storedItem) => storedItem.id === itemId
        );

        if (itemInStorageIndex !== -1) {
          storedItems[itemInStorageIndex] = updatedItem; // Atualiza a quantidade no localStorage
        } else {
          storedItems.push(updatedItem); // Adiciona o item ao localStorage caso não exista
        }

        localStorage.setItem("materiais", JSON.stringify(storedItems));

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
          openModal("confirm", {
            show: true,
            message: <StandardMessages messageType={3} />,
            handleConfirm: () => {
              // Remove o item do localStorage
              const storedItems = JSON.parse(localStorage.getItem("materiais")) || [];
              const updatedStoredItems = storedItems.filter(
                (storedItem) => storedItem.id !== itemId
              );
  
              // Atualiza o localStorage
              if (updatedStoredItems.length === 0) {
                localStorage.removeItem("materialList"); // Limpa o localStorage se não houver mais itens
              } else {
                localStorage.setItem(
                  "materialList",
                  JSON.stringify(updatedStoredItems)
                );
              }
  
              // Remove o item da lista
              const updatedList = [
                ...prevList.slice(0, index),
                ...prevList.slice(index + 1),
              ];
  
              setMaterialList(updatedList.length === 0 ? [] : updatedList);
            },
          });
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
      return materialList.map((item) => (
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
    }

    return (
      <tr>
        <td colSpan="4">Não há nenhum item na lista</td>
      </tr>
    );
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

  // Carregar o valor salvo do localStorage ao carregar o componente
  useEffect(() => {
    const savedSolicitante = localStorage.getItem('solicitante');
    if (savedSolicitante) {
      setSolicitante(savedSolicitante);
    }
  }, []);

  // Função para salvar no localStorage sempre que o valor mudar
  const handleSolicitanteChange = (e) => {
    setSolicitante(e.target.value);
    localStorage.setItem('solicitante', e.target.value);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="form-group form-control-lg text-center">
      <nav className="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between align-items-center px-3">
        <div className="container-fluid">
          <Button
            variant="dark"
            type="button"
            className="btn btn-dark me-2"
            onClick={(e) => {
              e.preventDefault();
              openModal("confirm", {
                show: true,
                message: <StandardMessages messageType={4} />,
                handleConfirm: () => {
                  window.location.href = "/";
                },
              });
            }}
          >
            <i className="bi bi-house-fill"></i>
          </Button>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "30px" }}
          />
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
        <div className="text-center mt-5 mb-3">
          <span>{`${cc4}-SM-${type4}`}</span>
        </div>
        <table className="table table-striped table-dark w-100">
          <thead className="small">
            <tr>
              <td>TAG</td>
              <td>DESCRIÇÃO</td>
              <td>QUANTIDADE</td>
              <td>
                <i className="bi bi-pencil-square"></i>
              </td>
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
          className="w-50 mb-4"
          onClick={clearAllMaterialsButton}
        >
          <i className="bi bi-trash3-fill"></i>   Limpar Tudo  
        </Button>
        <input
        type="text"
        className="form-control w-50 mb-5 text-center"
        placeholder="Seu Nome Completo"
        value={solicitante}
        onChange={handleSolicitanteChange}
        style={{ textTransform: 'uppercase' }}
      />
        <Button
          variant="primary"
          type="button"
          className="w-100 py-3 mb-3"
          onClick={sendData} // Chama sendData diretamente
          >
          <i className="bi bi-send-fill"></i> {/* Ícone de enviar */}
           Enviar SM     
        </Button>
      </div>
    </div>
  );
}

export default FormHMON;
