import { 
  Row, Col, Button,
  CardGroup, Card, CardImg,
  CardBody, CardTitle, CardSubtitle, CardFooter
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { listProducts as Api } from '../services/api-franchise';


const CardGroupComponent = ({ products, totalProducts, toggle, toggleUpdate, cssButton }) => {
  const [productAll, setProductAll] = useState(products);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getMoreProducts = async () => {
    const { 'nextToken': token } = parseCookies();
    const pageNext = `?page=${page + 1}&size=3`;
    const res = await Api(token, pageNext);
    setProductAll(productAll => [...productAll, ...res.content]);
    setPage(res.number);
  };

  useEffect(() =>{
      setHasMore(totalProducts > productAll.length);
  },[productAll]);  
  return (
    <>
    <InfiniteScroll
      dataLength={ productAll.length }
      next={ getMoreProducts }
      hasMore={ hasMore }
      style={ { overflow: 'hidden' } }
      loader={ <h2>Carregando...</h2>}
    >
      <CardGroup>
          <Row xs="3">
            { productAll.map((product, index) => (
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