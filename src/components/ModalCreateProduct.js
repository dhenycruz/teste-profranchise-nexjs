import { useState } from 'react';
import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Alert,
  Row, Col,
} from 'reactstrap';
import { parseCookies } from 'nookies';
import { useForm, useFieldArray } from 'react-hook-form';
import { saveProduct as API, listProducts as APIproducts } from '../services/api-franchise';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const ModalCreateProduct = ({ createModal, toggle}) => {
  const { setProducts } = useContext(ProductsContext);
  const { register, control, handleSubmit } = useForm();
  const [erroValidation, setErroValidation] =useState(null);
  const { fields , append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredients", // unique name for your Field Array
  });

  const saveProduct = async (data) => {
    if (data.ingredients.length === 0) {
      console.log(data.ingredients);
      setErroValidation('Esta faltando os ingredientes do produto!')
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
  }

  return(
    <Modal
      centered
      fullscreen="md"
      scrollable
      size="md"
      isOpen={ createModal }
      toggle={ () => toggle(null) }
    >
      <ModalHeader toggle={ () => toggle(null) }>
        Criando um novo produto:
      </ModalHeader>
        { erroValidation && 
            <span className="text-danger text-center">
              { erroValidation }
            </span>
        }
        <ModalBody>
          <Form onSubmit={ handleSubmit(saveProduct) }>
            <Row xs="1" sm="2" md="2" lg="2">
              <Col sm="9" md="9" lg="9">
                <FormGroup>
                  <Label for="name">
                    Nome
                  </Label>
                  <input
                    { ...register('name') }
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-control"
                  />
                </FormGroup>
              </Col>
              <Col sm="3" md="3" lg="3">
                <FormGroup>
                  <Label for="price">
                    Preço
                  </Label>
                  <input
                    type="number"
                    { ...register('price') }
                    id="price"
                    name="price"
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
                type="text"
                className="form-control"  
              />
            </FormGroup>
            <legend>
              Ingredientes
            </legend>
              { fields.map((field, index) => (
                <Row xs="1" sm="3" md="3" lg="3" key={index}>
                  <Col sm="6" md="6" lg="6">
                    <FormGroup tag="fieldset">
                      <Label for="name">
                        Nome
                      </Label>
                      <input
                        key={field.id}
                        {...register(`ingredients.${index}.name`)}
                        type="text"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                    <FormGroup>
                      <Label for="quantity">
                        Quantidade
                      </Label>
                      <input
                        type='number'
                        { ...register(`ingredients.${index}.quantity`, {
                          maxLength: 1
                        })}
                        id="quantity"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                  <FormGroup>
                      <Label for="cost">
                        Custo
                      </Label>
                      <input
                      { ...register(`ingredients.${index}.cost`)}
                        id="cost"
                        type="number"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ))}
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
  )
};

export default ModalCreateProduct;