/* eslint-disable @next/next/no-img-element */
import style from '../styles/navegation.module.css';
import { Button } from 'reactstrap';
import { destroyCookie } from 'nookies';
import Router from 'next/router'

const Navigation = ({ userName, cssImg }) => {
  const loggout = () => {
    destroyCookie({}, 'nextToken');
    Router.reload('/')
  };

  return (
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
        <Button outline onClick={ loggout }>
          Sair
        </Button>
      </div>
      </nav>
  )
};

export default Navigation;
