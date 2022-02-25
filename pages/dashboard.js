import Link from 'next/link';
import React from 'react';
import { Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { listProducts } from '../services/api-franchise';
import Navigation from '../components/Navigation';

export default function Dashboard ({ userName }) {
  const { userInfo } = useContext(AuthContext);
 
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <Navigation userName={ userName } />
    <div>
      <h1>Dashboard</h1>
      <p>Olá, { userName }!</p>
      <Link href="/">
          <Button color="primary">voltar</Button>
        </Link>
    </div>
    </>
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
