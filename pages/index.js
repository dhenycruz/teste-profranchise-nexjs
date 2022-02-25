import Head from 'next/head';
import React, { useEffect } from 'react';
import { Form, Col, Row, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = () => {
  useEffect(() => {
    console.log('Testando...');
  }, []);
  return (
    <div className='container-login'>
      <div className='box-login d-flex flex-column bd-highlight mb-3'>
        <h1 className='text-center'>Login</h1>
        
          <Form>
            <FormGroup>
              <Label for="Email">
                Email:
              </Label>
              <Input id="email"/>
            </FormGroup>
            <FormGroup>
              <Label>
                Senha:
              </Label>
              <Input />
            </FormGroup>
            <Button block size="lg" color="primary" type="button">ENTRAR</Button>
          </Form>
      </div>
    </div>
  )
};

export default Login;