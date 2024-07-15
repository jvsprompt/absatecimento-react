import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import FormAcademia from './pages/FormAcademia';
import FormHMON from './pages/FormHMON';
import Equipaments from './pages/Equipaments';
import FuelRegistration from './pages/FuelRegistration';
import OsEffort from './pages/OsEffort';
import Step1Form from './pages/Step1Form';
import MaterialsList from './pages/MaterialsList';

import KmRegistration from './pages/KmRegistration';
import SupplyRegistration from './pages/SupplyRegistration';
import MaintenanceRegistration from './pages/MaintenanceRegistration';
import DocRegistration from './pages/DocRegistration';

import CalcControlador from './pages/CalcControlador';
import SelectMotorista from './pages/SelectMotorista'; // Novo import
// import NovoVeiculo from './pages/NovoVeiculo'; // Novo import
import MenuUser from './pages/MenuUsuario'; // Novo import
import MenuGestor from './pages/MenuGestor'; // Novo import

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Form.css';
import './css/Equipaments.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Step1Form />} />
          <Route exact path="/form/HMON" element={<FormHMON />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/form/academia" element={<FormAcademia />} />
          <Route exact path="/form" element={<FormHMON />} />
          {/* <Route exact path="/form/igua" element={<Form />} /> */}
          {/* <Route exact path="/form/coppead" element={<Form />} /> */}
          <Route exact path="/equipamentos" element={<Equipaments />} />
          <Route exact path="/abastecimento" element={<FuelRegistration />} />
          <Route exact path="/oseffort" element={<OsEffort />} />
          <Route exact path="/material-lista" element={<MaterialsList />} />
          <Route exact path="/rota/:placa" element={<KmRegistration />} />
          <Route exact path="/abastecimento/:placa" element={<SupplyRegistration />} />
          <Route exact path="controlador" element={<CalcControlador />} />
          <Route exact path="/motorista" element={<SelectMotorista />} />
          {/* <Route exact path="/novo-veiculo" element={<NovoVeiculo />} /> */}
          <Route exact path="/menu_usuario/:placa" element={<MenuUser />} /> {/* Novo rota */}
          <Route exact path="/menu_gestor" element={<MenuGestor />} /> {/* Novo rota */}
          <Route exact path="/manutencao" element={<MaintenanceRegistration />} /> {/* Novo rota */}
          <Route exact path="/documentos" element={<DocRegistration />} /> {/* Novo rota */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
