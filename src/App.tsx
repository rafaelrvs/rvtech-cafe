import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import correto de Routes
import Home from './page/Home/Home.tsx'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
