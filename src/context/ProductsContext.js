import { createContext } from "react";
import { parseCookies } from "nookies";
import { useState } from "react";
import { listProducts as API } from "../services/api-franchise";
export const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async (query) => {
    const { 'nextToken': token } = parseCookies();
    const { 
      content: dataProducts,
      totalElements: totalProducts,
    } =  await API(token, query);
    return { dataProducts, totalProducts }
  };

  return (
    <ProductsContext.Provider value ={ { 
      products, setProducts, totalProducts, setTotalProducts, fetchProducts 
      } }>
      { children }
    </ProductsContext.Provider>
  )
};