import { Table, Button, Row, Col } from "reactstrap";
import PaginationComponent from "./PaginationComponent";
import { useState } from "react";

const ListProduct = ({ products, totalProducts, toggle, toggleUpdate, totalPages }) => {
  const [productAll, setProductAll] =useState(products);
  return(
    <>
      <h3>Total de produtos: {totalProducts}</h3>
      <Table hover>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
            </th>
            <th>
              Nome Produto
            </th>
            <th>
              Preço
            </th>
            {/* <th>
              Ingredientes
            </th>  */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          { productAll.map((product, index) => (
            <tr key={ index }>
            <th scope="row">
              { product.id }
            </th>
            <td>
              <img
                src={ product.image }
                alt="Imagem do produto"
                width={ 50 }
              />
            </td>
            <td>
            { product.name }
            </td>
            <td>
              { product.price }
            </td>
            {/* <td className={ cssIngredients }>
              {
                product.ingredients.map((ingredient) => (
                  <>
                    <span>{ ingredient.name }</span>
                    <span>Preço: { ingredient.cost }</span>
                    <span>Quantidade: { ingredient.quantity }</span>
                  </>
                ))}
            </td> */}
            <td>
              <Button
                color="danger"
                onClick={ () => toggle(product) }
                className="float-end"
              >
                Deletar
              </Button>
              <Button
                outline
                onClick={ () => toggleUpdate(product) }
                className="float-end"
              >
                Editar
              </Button>
            </td>      
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col 
          md={ { offset: 4, size: 4 } }
          sm="12"
        >
          <PaginationComponent totalPages={ totalPages } setProductAll={ setProductAll } />
        </Col>
      </Row>
    </>
  )
};

export default ListProduct;
