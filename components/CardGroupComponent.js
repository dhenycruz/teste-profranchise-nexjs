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

const CardGroupComponent = ({ products }) => {
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
                <Button>
                  Mais Detalhes
                </Button>
                <span className='float-end'>
                  <img 
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-pencil-creative-kiranshastry-lineal-kiranshastry.png"
                    alt="Editar Produto"
                    width={ 25 }
                  />
                </span>
                <span className='float-end'>
                  <img 
                    src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
                    alt="Delete Produto"
                    width={ 25 }
                  />
                </span>
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