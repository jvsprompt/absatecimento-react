import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import Form from './pages/Form';
import Equipaments from './pages/Equipaments';
import FuelRegistration from './pages/FuelRegistration';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Form />} />
          <Route path="/equipamentos" element={<Equipaments />} />
          <Route path="/abastecimento" element={<FuelRegistration />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
