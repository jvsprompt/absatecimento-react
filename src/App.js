import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import FormAcademia from './pages/FormAcademia';
import FormHMON from './pages/FormHMON';
import Equipaments from './pages/Equipaments';
import FuelRegistration from './pages/FuelRegistration';
import OsEffort from './pages/OsEffort';
import Step1Form from './pages/Step1Form';

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
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
