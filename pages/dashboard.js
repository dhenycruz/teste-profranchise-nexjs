import style from '../styles/dashboard.module.css';
import { Container, Row, Col, Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { listProducts } from '../services/api-franchise';
import Navigation from '../components/Navigation';
import CardGroupComponent from '../components/CardGroupComponent';
import ListProduct from '../components/ListProducts';
import ModalDelete from '../components/ModalDelete';

export default function Dashboard ({ userName, products }) {
  const [viewProduct, setViewProduct] = useState('galery');
  const [deleteModal, setDeleteModal] = useState(false);

  const changeViewProducts = (viewProd) => {
    setViewProduct(viewProd);
  };

  const handleClikc = (typeView) => {
    if (typeView === 'list') {
      changeViewProducts(typeView);
    } else {
      changeViewProducts(typeView)
    }
  };

  const toggle = () => setDeleteModal(!deleteModal);

  return (
    <Container fluid className={ style.containerDash }>
    <Head>
      <title>Dashboard</title>
    </Head>
    <Navigation userName={ userName } cssImg={ style.imgPerfil } />
    <main className={ style.mainDashboard }>
      <Row>
        <Col>
          <h1 className={ style.titleDashboard }>Dashboard</h1>
        </Col>
      </Row>
      <Row xs="2">
        <Col>
          <h2 className={ style.subTitleDashboard }>Lista de Produtos</h2>
        </Col>
        <Col>
          <Button
            outline
            className='float-end'
          >
            + Adicionar Produto
          </Button>
          {
            (viewProduct === 'galery') ? (
              <Button
                outline
                className='float-end'
                onClick={ () => handleClikc('list') }
              >
                <img 
                  src="https://img.icons8.com/ios-filled/50/000000/list.png"
                  alt="Botão de Lista"
                  width={ 20 }
                />
              </Button>
            ) : (
              <Button
                outline
                className='float-end'
                onClick={ () => handleClikc('galery') }
              >
                <img 
                  src="https://img.icons8.com/fluency-systems-filled/48/000000/small-icons.png"
                  alt="Botão de Galeria"
                  width={ 20 }
                />
              </Button>
            )
          }          
        </Col>
      </Row>
      <Row>
        <Col>
          { (viewProduct === 'galery') ? (
            <CardGroupComponent products={ products } toggle={ toggle } />
          ) : (
            <ListProduct 
              products={ products } 
              cssIngredients={ style.ingredientsList }
              tdProduct={ style.tdProduct }
              toggle={ toggle }
            />
          ) }
        </Col>
      </Row>
      <ModalDelete toggle={ toggle } deleteModal={ deleteModal } />
    </main>
    <footer className={ style.footerDashboard }>
      <p className={ style.pFooter }>Desenvolvido por: Dheniarley Cruz</p>
    </footer>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { 'nextToken': token } = parseCookies(context);
  const { userName } = parseCookies(context);
    if(!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
   const { content: products} =  await listProducts(token);
  return {
    props: { userName, products }, // will be passed to the page component as props
  }
}
