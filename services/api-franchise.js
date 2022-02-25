const axios = require('axios');

const login = async ({email , password}) => {
    const loggingIn = await  axios.post('https://prova.deploy.profranchising.com.br/auth/login',
     {
        username: email,
        password,
      });

      return loggingIn;
};

const listProducts = async (token) => {
  const response = await axios({
    method: 'get',
    url: 'https://prova.deploy.profranchising.com.br/product/list',
    headers: { 'Authorization': token }
  });

  return response.data;
};

const saveProduct = async (bodyProduct, token) => {
  const response = await axios({
    method: 'get',
    url: 'https://prova.deploy.profranchising.com.br/product/save',
    body: bodyProduct,
    headers: { 'Authorization': token }
  });

  return response.data;
};

const deleteProduct = async (id, token) => {
  const response = await axios({
    method: 'get',
    url: `https://prova.deploy.profranchising.com.br/product/delete/${id}`,
    body: { },
    headers: { 'Authorization': token }
  });

  return response.data;
};

module.exports = {
  login,
  listProducts,
  saveProduct,
  deleteProduct,
};
