/* eslint-disable @next/next/no-img-element */
import style from '../styles/dashboard.module.css';
import { Container, Row, Col, Button, InputGroup, Input, InputGroupText, Spinner } from 'reactstrap';
import { useState } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { listProducts as API } from '../services/api-franchise';
import Navigation from '../components/Navigation';
import CardGroupComponent from '../components/CardGroupComponent';
import ListProduct from '../components/ListProducts';
import ModalDelete from '../components/ModalDelete';
import ModalUpdateProduct from '../components/ModalUpdateProduct';
import ModalCreateProduct from '../components/ModalCreateProduct';

export default function Dashboard ({ userName, listProducts, listTotalPages, totalProducts })  {
  const [viewProduct, setViewProduct] = useState('galery');
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalInfoProd, setModalInfoProd] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  
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
  const toggleUpdate = (infoProd) => { setUpdateModal(!updateModal); setModalInfoProd(infoProd);};
  const toggleCreate = () => { setCreateModal(!createModal)}

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
                    height={ 20 }
                  />
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col>
              <Button
                outline
                className={ `float-end ${style.buttonActionProduct}` }
                onClick={ () => toggleCreate(true) }
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
                cssButton={ style.buttonActionProduct }
                toggle={ toggleDelete }
                toggleUpdate={ toggleUpdate}
              />
            ) : (
              <ListProduct 
                products={ listProducts }
                totalPages={ listTotalPages }
                totalProducts= {totalProducts}
                cssIngredients={ style.ingredientsList }
                tdProduct={ style.tdProduct }
                toggle={ toggleDelete }
                toggleUpdate={ toggleUpdate}
              />
            )}
        </Col>
      </Row>
      <ModalDelete
        toggle={ toggleDelete }
        deleteModal={ deleteModal }
        infoProduct={ modalInfoProd }
      />
      { modalInfoProd && (
        <ModalUpdateProduct
          toggle={ toggleUpdate }
          updateModal={ updateModal }
          infoProduct={ modalInfoProd }
          createModal={ createModal }
        /> 
      )}
      
      <ModalCreateProduct
        toggle={ toggleCreate }
        createModal={ createModal }
      />
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
    content: listProducts,
    totalPages: listTotalPages,
    totalElements: totalProducts,
  } = await API(token, '?page=0&size=10');
  return {
    props: { 
      userName,
      listProducts,
      listTotalPages,
      totalProducts,
    },
  }
};
