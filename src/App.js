import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';

import Form from './pages/Form';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
