import { useState } from 'react';
import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Input,
  Row, Col,
} from 'reactstrap';
import { useForm, useFieldArray } from 'react-hook-form';

const ModalCreateProduct = ({ createModal, toggle}) => {
  const [addItem, setItem] = useState(1);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredients", // unique name for your Field Array
  });

  const saveProduct = (data) => {
    console.log(data);
  }
  
  let items = []
    for (let i = 1; i <= addItem; i++) {
      items.push(i)
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
        <ModalBody>
          <Form onSubmit={ handleSubmit(saveProduct) }>
            <Row xs={2}>
              <Col xs={9}>
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
              <Col xs={3}>
                <FormGroup>
                  <Label for="price">
                    Preço
                  </Label>
                  <input
                  { ...register('price') }
                    id="price"
                    name="price"
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
                type="text"
                className="form-control"  
              />
            </FormGroup>
            <legend>
              Ingredientes
            </legend>
              { fields.map((field, index) => (
                <Row xs={ 4 } key={ index }>
                  <Col xs={ 6 }>
                    <FormGroup tag="fieldset">
                      <Label for="name">
                        Nome
                      </Label>
                      <input key={field.id}
                        { ...register(`ingredients.name`)}
                        id="name"
                        name="name"
                        type="text"
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
                        key={field.id}
                        { ...register(`ingredients.quantity`)}
                        id="quantity"
                        name="quantity"
                        type="number"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col xs= { 3 }>
                  <FormGroup>
                      <Label for="Cust">
                        Custo
                      </Label>
                      <input
                      { ...register(`cust.${index}.value`)}
                        id="cust"
                        name="cust"
                        type="number"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col> */}
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
            Cancel
          </Button>
        </ModalFooter>
        </Form>
        </ModalBody>
    </Modal>
  )
};

export default ModalCreateProduct;