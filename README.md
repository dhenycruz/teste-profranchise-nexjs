# Teste: Criar uma aplicação FRONT-END
 
 - Esse é o repositório do teste para a empresa PROFRANCHISING.
 - o teste tem como objetivo desenvolver uma aplicação FRONT-END
 - implementando as Rotas REST API;
 - Essa aplicação ira resolver o cadastro de produtos e suas receitas.
 - A aplicação deve ser facil de utilizar e agradavel ao usuário.

## Requisitos:
- Tela de login (proteger rotas)
- Lista de itens com paginação
- Editar item
- Remover item
- Adicionar item
- Validação nos formulários
- Criar repositório no GitHub
* Pode usar qualquer biblioteca que julgue necessário.

### Diferenciais:
- Paginação Infinita
- Typescript
- React Query
- Testes
- Next

Para realização de projeto foi utilizado:
* Next.js com as seguintes bibliotecas:
      * Reactstrap: Para implementar o layout da aplicação;
      * react-hook-form: Para poder gerenciar os formulários;
      * axios: Para fazer as requisições da API;
      * react-infinite-scroll-component: Para pode exibir os produtos no modelo de página infinita;
      * nookies: Para armazenar o Token gerado depois da autenticação na API em um cockie que será acessado tanto pelo lado do cliente como do lado do servidor;

# Instruções para rodar o projeto localmente:

1. Clone o repositório
  * `git clone `git@github.com:dhenycruz/teste-profranchise-next.js.git
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd `teste-profranchise-nextjs

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com a aplicação rodando)

# Para ver o projeto em produção basta acessar o link abaixo:
  * Um link aqui

# O que foi desenvolvido?

1. TELA DE LOGIN:
  * Foi criando o arquivo AuthContext.js para podermos fazer as validações das credenciais do usuário:
    * Nesse context, utilizamos o useState para armazenar se o usuário está logado ou não e um estado para guardar o retorno da API caso ela gere um erro de validação dos dados utilizados para acessar a nossa aplicação;
    * Criamos a função singIn(), ela será responsavel por fazer nosso request na API;
     * Dentro dessa função, fizemos a requisição na api com todos dados que ela precisa (headers, data...);
     * Após ser feita a requisição e ter tornando status 200, armazenamos nosso token em um cockie e por isso usamos a biblioteca nookies, pois também fazemos fazer a consulta desse cockie do lado do servidor;
      * Tudo certo, o usuário é redirecionando para nossa página Dashboard;
  * Layout:
    * Fizemos um layout simples e intuitivo para nossa página de login, apenas com um formulário de autenticação e um titulo com o nome login;

2. TELA DE DASHBOARD:
  * Aqui onde está toda nossa aplicação, aqui no dashboard onde o usuário vai poder deletar, criare e editar seus produtos;
  * Para fazer a autenticação do usuario nessa página, foi utilizado um recurso do next, que é de redenrizar a página no servidor, utilizamos a função getServerSideProps, dentro dela usamos a própria biblioteca que salvou nosso token no cockie do navegador e também do lado do servidor para autenticarmos o usuário, caso esse token não exista o usuário será redirecionado para tela de Login;
  * Nessa função também tem um requisição para api para buscar uma lista de produtos, essa requisição é para lista de produtos, falaremos dessa lista logo mais;
  * Foi utilizado modal para poder editar, remover, adicionar ou remover um produto, assim o usuário poderá ficar na ágina dashboard e poder acessar todos recursos da aplicação;
    * Para esse funcionalidade, criei componentes para cada modal, utilizei useState para tá controlando e passando os dados de um produto específico.
  * Agora sim, para exibir a lista de produtos, optei por dar o direito de escolha para o usuário, ele pode escolher se quer ver os produtos em cards e aplicando o conceito de página infinita ou ver os produtos em uma tabela com paginação tradicional;
  
# Qual foi meu maior desafio nesse teste?
 * Poderia ter usado React.js onde já tinha domínio, já tinha feito alguns projetos com ele, mas decidi aprender Next.js, foram dias muito desafiadores, de muito tabralho e persistência, consegui entender e desenvolver essa aplicação com Next.js, também decidi aprender a utilizar uma biblioteca para fazer o infity scroll e ficou muito legal.

 # Pontos de melhoria
   Na hora de remover, editar ou criar um novo produto, quando você fazer alguma dessas operação, a lista de produtos não é atualizada, então resolvi esse problema criando um context para o produto, onde deixei um estado global para ter essa lista de produto, então toda vez que eu fazia alguma operação, eu fazia uma chamada na api e atualizava esse estado global onde minha aplicação era renderizada novamente, mostrando a lista de produtos atualizada.
   Porém, olhando a biblioteca React Query, ela faz esse monitoramente para gente de forma mais eficiente e guardando no cache do browser consultas que algum dos componentes da nossa aplicação já tenha feito, então essa seria um dos pontos de melhoria para essa aplicação.
   Nas próximas refatorações aplicar TypeScript e fazer os teste para aplicação.

