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
  CardText } from 'reactstrap';

const CardGroupComponent = () => {
  const mapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <CardGroup>
      <Row xs="3">
        { mapArray.map((item) => (
          <Col className='mb-3'>
          <Card>
            <CardImg
              alt="Card image cap"
              src="https://picsum.photos/318/180"
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                Card title
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                Card subtitle
              </CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
              </CardText>
              <Button>
                Button
              </Button>
            </CardBody>
          </Card>
          </Col>
        ))}
      </Row>
    </CardGroup>
  )
};

export default CardGroupComponent;