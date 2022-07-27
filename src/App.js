import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Home from './pages/Home';
import Form from './pages/Form';
import Equipaments from './pages/Equipaments';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Form.css';
import './css/Equipaments.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Form />} />
          <Route path="/equipamentos" element={<Equipaments />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
