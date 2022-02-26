import {
  Row,
  Col,
  Button,
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText, 
  CardFooter} from 'reactstrap';

const CardGroupComponent = ({ products, toggle, toggleUpdate, cssButton }) => {
  return (
    <CardGroup>
      <Row xs="3">
        { products.map((product) => (
          <Col className='mb-3'>
          <Card>
            <CardImg
              alt="Imagem do Produto"
              src={ product.image }
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                { product.name }
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                R$ { product.price }
              </CardSubtitle>
              <CardText>
                <span>Ingredientes</span>
                {
                  product.ingredients.map((ingredient) => (
                    <>
                      <p>{ ingredient.name }</p>
                      <p>Custo: {ingredient.cost }</p>
                    </>
                  ))}
              </CardText>
              <CardFooter>
                <Button
                  color="danger"
                  onClick={ toggle }
                  className={ `float-end ${cssButton}` }
                >
                  Deletar
                </Button>
                <Button
                  outline
                  onClick={ toggleUpdate }
                  className="float-end"
                >
                  Editar
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
          </Col>
        ))}
      </Row>
    </CardGroup>
  )
};

export default CardGroupComponent;