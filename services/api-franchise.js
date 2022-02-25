const axios = require('axios');

const login = async ({email , password}) => {
    const loggingIn = await  axios.post("https://prova.deploy.profranchising.com.br/auth/login",
     {
        username: email,
        password,
      });
      
      /*.then((response) => response)
      .catch((error) => {
        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um código de status
          // que sai do alcance de 2xx
          //return error.response.data;
          return error.response.data;
          
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // A requisição foi feita mas nenhuma resposta foi recebida
          // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
          // http.ClientRequest no node.js
          console.error(error.request);
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error('Error', error.message);
        }
        console.error(error.config);
      });
    */
};

module.exports = {
  login
}