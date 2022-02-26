import { Table, Button } from "reactstrap";

const ListProduct = ({ products, cssIngredients, toggle, toggleUpdate }) => {
  console.log(products);
  return(
    <Table bordered>
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
          <th>
            Ingredientes
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { products.map((product) => (
          <tr>
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
          <td className={ cssIngredients }>
            {
              product.ingredients.map((ingredient) => (
                <>
                  <span>{ ingredient.name }</span>
                  <span>Preço: { ingredient.cost }</span>
                  <span>Quantidade: { ingredient.quantity }</span>
                </>
              ))}
          </td>
          <td>
            <Button
              outline
              onClick={ toggleUpdate }
              className="float-end"
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={ () => toggle(2) }
              className="float-end"
            >
              Deletar
            </Button>
          </td>      
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default ListProduct;


/*{
  ok - "image": "https://fortatacadista.vteximg.com.br/arquivos/ids/161328-1000-1000/LARANJA-LIMA-KG---631876.jpg?v=637505503815100000",
  "ingredients": [
    {
      "cost": 5,
      "name": "suco de laranja",
      "quantity": 10
    }
  ],
  ok - "name": "laranja",
  ok - "price": 20
} */