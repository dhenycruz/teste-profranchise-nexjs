import { useContext } from 'react';
import Head from 'next/head';
import { Form, FormGroup, Label, Button} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import style from '../styles/login.module.css';

const Login = () => {
  const { signIN, errorLogin } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  
  const handleSignIn = async (data) => {
    const response = await signIN(data);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={ style.containerLogin }>
        <div className={ style.boxLogin }>
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
                { errorLogin && (
                 <p className={ style.errorLogin }>{ errorLogin }</p>
                )}
              <Button block size="lg" color="primary" type="submit">ENTRAR</Button>
            </Form>
        </div>
      </div>
    </>
  )
};

export default Login;