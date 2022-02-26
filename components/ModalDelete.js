import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
const ModalDelete = ({ toggle, deleteModal}) => {
  return(
    <>
    <Modal
      backdrop={ true }
      centered
      fullscreen="sm"
      scrollable
      size="sm"
      toggle={ toggle }
      isOpen={ deleteModal }
    >
      <ModalHeader toggle={toggle}>
        Deletando produto
      </ModalHeader>
      <ModalBody>
        Tem certeza que deseja deletar esse produto?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={function noRefCheck(){}}
        >
          Sim
        </Button>
        {' '}
        <Button onClick={ toggle }>
          Não
        </Button>
      </ModalFooter>
    </Modal>
    </>
  )
};

export default ModalDelete