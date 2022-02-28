import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Input,
  Row, Col,
} from 'reactstrap';
const ModalUpdateProduct = ({ toggle, updateModal, infoProduct }) => {
  if (!infoProduct) return ( <></>);
  return (
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
        <input type="hidden" value = { infoProduct.id } />
      <Form>
        <Row xs={2}>
          <Col xs={9}>
            <FormGroup>
              <Label for="nameProduct">
                Nome
              </Label>
              <Input
                id="nameProduct"
                name="name"
                value={ infoProduct.name }
                type="text"
              />
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup>
              <Label for="preco">
                Preço
              </Label>
              <Input
                id="preco"
                name="price"
                value={ infoProduct.price }
                type="number"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="image">
            Imagem - url
          </Label>
          <Input
            id="image"
            name="address"
            value={ infoProduct.image }
            
          />
        </FormGroup>
        <legend>
          Ingredientes
        </legend>
        {
          infoProduct.ingredients.map((ingredient, index) => (
            <Row xs={ 3 } >
              <Col xs={ 6 }>
                <input type="hidden" value={ ingredient.id } />
                <FormGroup tag="fieldset">
                  <Label for={ `ingredient-name-${index}` }>
                    Nome
                  </Label>
                  <Input
                    id={ `ingredient-name-${index}` }
                    name={ `ingredient-name-${index}` }
                    value={ ingredient.name }
                  />
                </FormGroup>
              </Col>
              <Col xs={ 3 }>
                <FormGroup>
                  <Label for={ `custo-${ingredient.quantity}` }>
                    Quantidade
                  </Label>
                  <Input
                    id={ `custo-${ingredient.quantity}` }
                    name={ `custo-${ingredient.quantity}` }
                    value={ ingredient.quantity }
                    type="number"
                  />
                </FormGroup>
              </Col>
              <Col xs= { 3 }>
              <FormGroup>
                  <Label for={ `quantidade-${ingredient.cost}` }>
                    Custo
                  </Label>
                  <Input
                    id={ `quantidade-${ingredient.cost}` }
                    name={ `quantidade-${ingredient.cost}` }
                    value={ ingredient.cost }
                    type="number"
                  />
                </FormGroup>
              </Col>
            </Row>
          ))
        }
      </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={function noRefCheck(){}}
        >
          Salvar
        </Button>
        {' '}
        <Button onClick={ () => toggle(null) }>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default ModalUpdateProduct;