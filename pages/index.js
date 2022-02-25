import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Form, Col, FormGroup, Label, Input, Button, Container } from 'reactstrap';

const Login = () => (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login</h1>
      <Form>
        <Col md={6}>
          <FormGroup>
            <Label for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Digite seu email aqui"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password">
              Email
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Digite sua senha"
              type="password"
            />
          </FormGroup>
        </Col>
        <Button color="success">
          Entrar
        </Button>
      </Form>
    </Container>
);

export default Login;