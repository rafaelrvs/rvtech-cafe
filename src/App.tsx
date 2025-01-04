import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import correto de Routes
import Home from './page/Home/Home.tsx'; 
import './App.css';
import { GlobalStorage } from './Context/GlobalContext.tsx'; // Importa o Provider do contexto

function App() {
  return (
    <GlobalStorage> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalStorage>
  );
}

export default App;
