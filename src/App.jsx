import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import Navbar from './components/navbar.jsx';
import Home from './pages/Home.jsx';
import Registros from './pages/Registros.jsx';
import Detalhes from './pages/Detalhes.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/registros" element={<Registros />} />

        <Route path="/registros/:id" element={<Detalhes />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
