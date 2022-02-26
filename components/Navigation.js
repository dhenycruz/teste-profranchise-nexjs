import style from '../styles/navegation.module.css';
import { Button } from 'reactstrap';
const Navigation = ({ userName, cssImg }) => {
  return (
    <header className={ style.headerDashboard }>
      <nav className={ style.navHeader }>
        <div className={ style.divNav}>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
            alt="foto de perfil"
            className={ style.imgPerfil }
          /> 
          Olá, { userName }!
        </div>
      <div className={ style.divNav }>
        <Button outline>
          Sair
        </Button>
      </div>
      </nav>
    </header>
  )
};

export default Navigation;