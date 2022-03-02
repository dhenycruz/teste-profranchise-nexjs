/* eslint-disable react-hooks/exhaustive-deps */
import { 
  Row, Col, Button,
  CardGroup, Card, CardImg,
  CardBody, CardTitle, CardSubtitle, CardFooter
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const CardGroupComponent = ({ toggle, toggleUpdate, cssButton }) => {
  const { 
    products, setProducts, totalProducts, setTotalProducts, fetchProducts,
  } = useContext(ProductsContext);
  const [page, setPage] = useState(0);

  const getMoreProducts = async () => {
    const pageNext = `?page=${page + 1}&size=3`;
    const res = await fetchProducts(pageNext);
    setProducts([...products, ...res.dataProducts]);
    setPage(page + 1);
  };

  const fetch = async () => {
    const response = await fetchProducts('?page=0&size=6');
    setProducts(response.dataProducts);
    setTotalProducts(response.totalProducts);
  }


  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
    <InfiniteScroll
      dataLength={ products.length }
      next={ getMoreProducts }
      hasMore={ true }
      style={ { overflow: 'hidden' } }
    >
      <CardGroup>
          <Row xs="3">
            { products.map((product, index) => (
              <Col className='mb-3' key={index}>
              <Card>
                <CardImg
                  alt="Imagem do Produto"
                  src={ product.image }
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle tag="h5">
                    { product.name } - { product.id }
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    R$ { product.price }
                  </CardSubtitle>
                  <hr/>
                    <h6>Ingredientes:</h6>
                      <ul>
                        {
                          product.ingredients.map((ingredient, index) => (
                            <li key={ index }>
                              { `${ingredient.quantity} - ${ingredient.name}` }
                              { (ingredient.length > index) ? '.' : ', ' }
                            </li>
                        ))}
                      </ul>
                </CardBody>
                <CardFooter>
                  <Button
                    color="danger"
                    onClick={ () => toggle(product) }
                    className={ `float-end ${cssButton}` }
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
                </CardFooter>
              </Card>
              </Col>
            ))}
          </Row>
      </CardGroup>
    </InfiniteScroll>
    </>
  )
};

export default CardGroupComponent;
