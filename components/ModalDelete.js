import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { deleteProduct as Api, listProducts } from '../services/api-franchise';
import { parseCookies } from 'nookies';

const ModalDelete = ({ toggle, deleteModal, infoProduct, setProducts }) => {
  const deleteProduct = async (id) => {
    const { 'nextToken': token } = parseCookies();
    await Api(token, id);
    const refreshProducts = await listProducts(token, '?page=0&size=3');
    toggle(null);
    setProducts(refreshProducts.content);
  };

  if (!infoProduct) return ( <></>);
  return(
    <Modal
      backdrop={ true }
      centered
      fullscreen="sm"
      scrollable
      size="sm"
      toggle={ () => toggle(null) }
      isOpen={ deleteModal }
    >
      <ModalHeader toggle={ () => toggle(null) }>
        Deletando produto
      </ModalHeader>
      <ModalBody>
        Tem certeza que deseja deletar o produto { infoProduct.name }?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={ () => deleteProduct(infoProduct.id) }
        >
          Sim
        </Button>
        {' '}
        <Button onClick={ () => toggle(null) }>
          Não
        </Button>
      </ModalFooter>
    </Modal>
  )  
};

export default ModalDelete