import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Produtos from './compomentes/pages/Produtos';
import Cidades from './compomentes/pages/Cidades';
import Marcas from './compomentes/pages/Marcas';
import NavBar from './compomentes/layout/NavBar';



function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Produtos/>} />
        <Route path='/Produtos' element={<Produtos/>} />
        <Route exact path='/Cidades' element={<Cidades/>} />
        <Route exact path='/Marcas' element={<Marcas/>} />
      </Routes>
    </Router>
  );
}

export default App;
