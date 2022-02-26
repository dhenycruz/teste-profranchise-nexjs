import style from '../styles/dashboard.module.css';
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { listProducts } from '../services/api-franchise';
import Navigation from '../components/Navigation';
import CardGroupComponent from '../components/CardGroupComponent';

export default function Dashboard ({ userName }) {
  const { userInfo } = useContext(AuthContext);
 
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
        </Col>
      </Row>
      <Row>
        <Col>
          <CardGroupComponent />
        </Col>
      </Row>
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
   const listProductsAll =  await listProducts(token);
   console.log(listProductsAll);
  return {
    props: { userName, listProductsAll }, // will be passed to the page component as props
  }
}
