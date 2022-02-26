import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
const ModalDelete = ({ toggle, deleteModal, dadosDelete }) => {
  return(
    <>
    <Modal
      backdrop={ true }
      centered
      fullscreen="sm"
      scrollable
      size="sm"
      toggle={ () => toggle(dadosDelete) }
      isOpen={ deleteModal }
    >
      <ModalHeader toggle={ () => toggle(dadosDelete) }>
        Deletando produto id: { dadosDelete }
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
        <Button onClick={ () => toggle(dadosDelete) }>
          Não
        </Button>
      </ModalFooter>
    </Modal>
    </>
  )
};

export default ModalDelete