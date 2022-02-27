import style from '../styles/dashboard.module.css';
import { Container, Row, Col, Button, InputGroup, Input, InputGroupText } from 'reactstrap';
import { useState } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { listProducts as API } from '../services/api-franchise';
import Navigation from '../components/Navigation';
import CardGroupComponent from '../components/CardGroupComponent';
import ListProduct from '../components/ListProducts';
import ModalDelete from '../components/ModalDelete';
import ModalUpdateProduct from '../components/ModalUpdateProduct';

export default function Dashboard ({ 
  userName, products, totalProducts, listProducts, listTotalPages
}) {
  const [viewProduct, setViewProduct] = useState('galery');
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalInfoProd, setModalInfoProd] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);

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

  const toggleDelete = (infoProd) => { setModalInfoProd(infoProd); setDeleteModal(!deleteModal)};
  const toggleUpdate = (infoProd) => { setModalInfoProd(infoProd); setUpdateModal(!updateModal)};

  return (
    <Container fluid className={ style.containerDash }>
    <Head>
      <title>Dashboard</title>
    </Head>
    <header className={ style.headerDashboard }>
      <Navigation userName={ userName } cssImg={ style.imgPerfil } />
      <div className={ style.positionFixed }>
          <Row>
            <Col>
              <h1 className={ style.titleDashboard }>Dashboard</h1>
            </Col>
          </Row>
          <Row xs="3">
            <Col>
              <h2 className={ style.subTitleDashboard }>Lista de Produtos</h2>
            </Col>
            <Col>
              <InputGroup>
                <Input />
                <InputGroupText>
                  <img 
                    src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
                    alt="Pesquisar"
                    width={ 20 }
                  />
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col>
              <Button
                outline
                className={ `float-end ${style.buttonActionProduct}` }
              >
                + Adicionar Produto
              </Button>
              {
                (viewProduct === 'galery') ? (
                  <Button
                    outline
                    className="float-end"
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
      </div>
    </header>
    <main className={ style.mainDashboard }>
      <Row className={ style.rowMarginTop}>
        <Col>
          { (viewProduct === 'galery') ? (
            <CardGroupComponent 
              products={ products }
              totalProducts={ totalProducts }
              cssButton={ style.buttonActionProduct }
              toggle={ toggleDelete }
              toggleUpdate={ toggleUpdate}
            />
          ) : (
            <ListProduct 
              products={ listProducts }
              totalPages={ listTotalPages }
              cssIngredients={ style.ingredientsList }
              tdProduct={ style.tdProduct }
              toggle={ toggleDelete }
              toggleUpdate={ toggleUpdate}
            />
          ) }
        </Col>
      </Row>
      <ModalDelete toggle={ toggleDelete } deleteModal={ deleteModal } infoProduct={ modalInfoProd } />
      <ModalUpdateProduct toggle={ toggleUpdate } updateModal={ updateModal } infoProduct={ modalInfoProd }/>
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
  const { 
    content: products,
    totalElements: totalProducts,
  } =  await API(token, '?page=0&size=3');
  const resultList = await API(token, '?page=0&size=10');
  const listProducts = resultList.content;
  const listTotalPages = resultList.number;
  return {
    props: { 
      userName,
      products,
      totalProducts,
      listProducts,
      listTotalPages,
    },
  }
};
