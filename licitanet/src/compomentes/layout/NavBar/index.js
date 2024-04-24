import { Link } from "react-router-dom";
import style from './NavBar.module.css'

// Componente para a barra de navegação
const NavBar = () => {
    return (
    <nav className={style.navBar}>
        <li className={style.iten}><Link to="/Produtos">Produtos</Link></li>
        <li className={style.iten}><Link to="/Cidades">Cidades</Link></li>
        <li className={style.iten}><Link to="/Marcas">Marcas</Link></li>
    </nav>
    )
  }
  
  export default NavBar;