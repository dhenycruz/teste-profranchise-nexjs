import { useEffect, useState } from 'react';
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
  const { setProducts } = useContext(ProductsContext);
  const [product, setValue] = useState(null);
  const [erroValidation, setErroValidation] =useState(null);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients", // unique name for your Field Array
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

  useEffect(() => {
    setValue(infoProduct);
  }, [infoProduct]);

  if (!infoProduct) return ( <></>);
  return (
    <>
      { product && (
        <Modal
          centered
          fullscreen="md"
          scrollable
          size="md"
          isOpen={ updateModal }
          toggle={ () => toggle(null) }
        >
          <ModalHeader toggle={ () => toggle(null) }>
            Editando o produto: { product.name }
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
                value = { product.id }
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
                        value={ product.name }
                        onChange= { ({ target }) => setValue({ product: { name: target.value }}) }
                        type="text"
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
                        value={ product.price }
                        onChange= { ({ target }) => setValue({ product: { price: target.value }}) }
                        type="number"
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
                    { ...register('image') }
                    id="image"
                    name="image"
                    value={ product.image }
                    onChange= { ({ target }) => setValue({ product: { image: target.value }}) }
                    className="form-control"
                  />
                </FormGroup>
                <legend>
                  Ingredientes
                </legend>
                {
                  infoProduct.ingredients.map((ingredient, index) => (
                    <Row xs={ 3 } key={ index }>
                      <Col xs={ 6 }>

                        <input type="hidden" value={ ingredient.id } />
                        <FormGroup tag="fieldset">
                          <Label for="name">
                            Nome
                          </Label>
                          <input
                            { ...register(`ingredients.${index}.name`)}
                            id="name"
                            name="name"
                            value={ product.ingredients[index].name }
                            onChange= { ({ target }) => setValueIngredients(valueIngredients) }
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
                            { ...register(`ingredients.${index}.quantity`)}
                            id="quantity"
                            name="quantity"
                            value={ ingredient.quantity }
                            type="number"
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
                            { ...register(`ingredients.${index}.cost`) }
                            id="cost"
                            name="cost"
                            value={ ingredient.cost }
                            type="number"
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