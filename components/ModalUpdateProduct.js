import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Input,
  Row, Col,
} from 'reactstrap';
const ModalUpdateProduct = ({ toggle, updateModal, name }) => {
  return (
    <Modal
      centered
      fullscreen="md"
      scrollable
      size=""
      isOpen={ updateModal }
      toggle={ toggle }
    >
      <ModalHeader toggle={ toggle }>
        Editando o produto { name }
      </ModalHeader>
      <ModalBody>
      <Form>
  <Row xs={2}>
    <Col xs={9}>
      <FormGroup>
        <Label for="exampleEmail">
          Nome
        </Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Produto 2"
          type="email"
        />
      </FormGroup>
    </Col>
    <Col xs={3}>
      <FormGroup>
        <Label for="examplePassword">
          Preço
        </Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="R$ 10,00"
          type="password"
        />
      </FormGroup>
    </Col>
  </Row>
  <FormGroup>
    <Label for="exampleAddress">
      Imagem - url
    </Label>
    <Input
      id="exampleAddress"
      name="address"
      placeholder="https://imagem.jpg"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleAddress2">
      Address 2
    </Label>
    <Input
      id="exampleAddress2"
      name="address2"
      placeholder="Apartment, studio, or floor"
    />
  </FormGroup>
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
        <Button onClick={ toggle }>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default ModalUpdateProduct;