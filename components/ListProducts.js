import { Table } from "reactstrap";

const ListProduct = ({ products, cssIngredients, toggle }) => {
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
            <div>
              <img 
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-pencil-creative-kiranshastry-lineal-kiranshastry.png"
                alt="Editar Produto"
                width={ 25 }
              />
            </div>
          </td>
          <td>
            <div onClick={ toggle }>
              <img 
                src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
                alt="Delete Produto"
                width={ 25 }
              />
            </div>
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