import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import Form from './pages/Form';
import Form2 from './pages/Form2';
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

          {/* remover quando aplicativo estiver atualizado */}
          <Route exact path="/formulario" element={<Form />} />

          {/* remover quando aplicativo estiver atualizado */}
          <Route exact path="/formulario2" element={<Form2 />} />

          <Route exact path="/form/academia" element={<Form />} />
          <Route exact path="/form/hmon" element={<Form />} />
          <Route exact path="/form/igua" element={<Form2 />} />
          <Route exact path="/form/coppead" element={<Form2 />} />
          <Route exact path="/equipamentos" element={<Equipaments />} />
          <Route exact path="/abastecimento" element={<FuelRegistration />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
