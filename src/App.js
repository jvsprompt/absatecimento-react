import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import FormAcademia from './pages/FormAcademia';
import Equipaments from './pages/Equipaments';
import FuelRegistration from './pages/FuelRegistration';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Form.css';
import './css/Equipaments.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* <Route exact path="/formulario" element={<Form />} />
          <Route exact path="/formulario2" element={<Form2 />} /> */}

          <Route exact path="/form/academia" element={<FormAcademia />} />
          {/* <Route exact path="/form/hmon" element={<Form />} />
          <Route exact path="/form/igua" element={<Form />} />
          <Route exact path="/form/coppead" element={<Form />} /> */}
          <Route exact path="/equipamentos" element={<Equipaments />} />
          <Route exact path="/abastecimento" element={<FuelRegistration />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
