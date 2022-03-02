import { useState } from 'react';
import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label,
  Row, Col,
} from 'reactstrap';
import { parseCookies } from 'nookies';
import { useForm, useFieldArray, getValues, set } from 'react-hook-form';
import { saveProduct as API, listProducts as APIproducts } from '../services/api-franchise';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const ModalUpdateProduct = ({ toggle, updateModal, infoProduct }) => {
  console.log(infoProduct)
  const { setProducts } = useContext(ProductsContext);

  const [erroValidation, setErroValidation] =useState(null);

  const { register, control, handleSubmit } = useForm({
      defaultValues: infoProduct
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const saveProduct = async (data) => {
    if (data.ingredients.length === 0) {
      setErroValidation('Esta faltando os ingredientes do produto!');
      return;
    }
    const { 'nextToken': token } = parseCookies();
    try {
      await API(token, data);
    } catch (e) {
      console.log('deu erro:', e);
    }
     const response = await APIproducts(token, '?page=0&size=6');
    setProducts(response.content);
    toggle(null);
    setErroValidation(null);
  };

  if (!infoProduct) return ( <></>);
  return (
    <>
      { infoProduct && (
        <Modal
          centered
          fullscreen="md"
          scrollable
          size="md"
          isOpen={ updateModal }
          toggle={ () => toggle(null) }
        >
          <ModalHeader toggle={ () => toggle(null) }>
            Editando o produto: { infoProduct.name }
          </ModalHeader>
          <ModalBody>
              { erroValidation && 
                <span className="text-danger text-center">
                  { erroValidation }
                  </span>
              }
              <Form onSubmit={ handleSubmit(saveProduct)}>
              <input 
                { ...register('id') }
                type="hidden"
                name="id"
                defaultValue={ 'id' }
              />
                <Row xs={2}>
                  <Col xs={9}>
                    <FormGroup>
                      <Label for="nameProduct">
                        Nome
                      </Label>
                      <input
                        { ...register('name') }
                        id="nameProduct"
                        name="name"
                        type="text"
                        defaultValue={ 'name' }
                        className='form-control'
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={3}>
                    <FormGroup>
                      <Label for="preco">
                        Preço
                      </Label>
                      <input
                        { ...register('price') }
                        id="preco"
                        type="number"
                        defaultValues={ 'price' }
                        className='form-control'
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="image">
                    Imagem - url
                  </Label>
                  <input
                    id="image"
                    name="image"
                    defaultValues={ 'image' }
                    { ...register('image') }
                    className="form-control"
                  />
                </FormGroup>
                <legend>
                  Ingredientes
                </legend>
                {
                  fields.map((ingredient, index) => (
                    <Row xs={ 3 } key={ index }>
                      <Col xs={ 6 }>

                        <input 
                          type="hidden"
                          name="id"
                          defaultValues={`ingredients[${index}].id`}
                          { ...register(`ingredients.${index.id}`) } />
                        <FormGroup tag="fieldset">
                          <Label for="name">
                            Nome
                          </Label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValues={ `ingerdients[${index}].name` }
                            { ...register(`.ingredients[${index}].name`)}
                            className="form-control"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={ 3 }>
                        <FormGroup>
                          <Label for="quantity">
                            Quantidade
                          </Label>
                          <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            defaultValues={ `ingredients[${index}].quantity`}
                            { ...register(`ingredients.${index}.quantity`) }
                            className="form-control"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs= { 3 }>
                      <FormGroup>
                          <Label for="cost">
                            Custo
                          </Label>
                          <input
                            id="cost"
                            name="cost"
                            type="number"
                            defaultValues={ `ingredients[${index}].cost`}
                            { ...register(`ingredients.${index}.cost`) }
                            className="form-control"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ))
                }
                <Button
                  block
                  onClick={ () => append({}) }
                  outline
                  size="sm"
                >
                  + Adicionar mais um ingrediente
                </Button>
                <br/>
                <Button
                  block
                  onClick={ () => remove({}) }
                  color="danger"
                  outline
                  size="sm"
                >
                  - Remover um ingrediente
                </Button>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Salvar
                  </Button>
                  {' '}
                  <Button onClick={ () => toggle(null) }>
                    Cancelar
                  </Button>
                </ModalFooter>
              </Form>
          </ModalBody>
        </Modal>
      )}
    </>
  )
};

export default ModalUpdateProduct;