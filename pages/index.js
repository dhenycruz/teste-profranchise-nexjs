import React, { useEffect } from 'react';
import Head from 'next/head';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleSignIn = (data) => {
    console.log(data) 
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='container-login'>
        <div className='box-login d-flex flex-column bd-highlight mb-3'>
          <h1 className='text-center'>Login</h1>
          
            <Form onSubmit={ handleSubmit(handleSignIn) }>
              <FormGroup>
                <Label for="Email">
                  Email:
                </Label>
                <input
                  { ...register('email') }
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-control"
                  placeholder='Digite seu email'
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Senha:
                </Label>
                <input 
                  { ...register('password') }
                  id="password"
                  name="password"
                  type="password"
                  required
                  className='form-control'
                  placeholder="Digite sua senha"
                />
              </FormGroup>
              <Button  block size="lg" color="primary" type="submit">ENTRAR</Button>
            </Form>
        </div>
      </div>
    </>
  )
};

export default Login;