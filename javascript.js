const chaveDeAcesso = "o1QBUY9zg570Kwxh-88UwDFUAdixtgX0T3BbcTooLYw";

const pesquisarForm = document.getElementById("pesquisar-form");
const campoDePesquisa = document.getElementById("campo-de-pesquisa");
const resultadoDaPesquisa = document.getElementById("resultado-pesquisa");
const mostrarMaisBtn = document.getElementById("mostrar-mais-btn");

//PS: Não sei se é necessário a atribuição de valor a eles aqui.
let palavraChave = "";
let pagina = 1;

async function pesquisarImagem(){
  //O valor digitado no campo de pesquisa é armazenado na variavel palavraChave
  palavraChave = campoDePesquisa.value;

  const url = `https://api.unsplash.com/search/photos?page=${pagina}&query=${palavraChave}&client_id=${chaveDeAcesso}&per_page=12`;
  
  //A keyword "await" congela a execução do código inteiro até que a url da api seja alcançada utilizando a função fetch(url)
  //A função fetch não retorna os dados da api, ela retorna uma Promise, que é a resposta ao "pedido" de conexão com a api.
  const resposta = await fetch(url);

  //Json transforma a resposta em um formato de texto que pode ser lido pelo javascript.
  //Em outras plvrs ele analisa o conteúdo e transforma em objeto.  
  const data = await resposta.json();

  //Reseta os resultados quando fizer uma nova pesquisa (Toda pesquisa começa com a variavel "pagina" tendo o valor `1` - veja pesquisarForm Event)
  if(pagina===1){
    resultadoDaPesquisa.innerHTML = "";
  }

  //Coloca as informações da api na constante result. Antes disso foi utilizado um console.log(data) para checar o objeto da api
  const results = data.results;

  //map itera/percorre sobre cada resultado retornado da pesquisa, permitindo que executemos uma ação para cada resultado. 
  results.map((result) =>{

        //cria uma tag img - O CSS dessa tag será feita logo após
        const imagem = document.createElement("img");

        //Adiciona a url da imagem na tag <img> ("small" é um dos tipos de imagem, existem vários outros)
        imagem.src = result.urls.small;

        //cria uma tag <a> (hyperlink)
        const imagemLink = document.createElement("a");

        //Adiciona o link da imagem na tag <a>
        imagemLink.href = result.links.html;

        //Faz o link ser aberto numa nova aba
        imagemLink.target = "_blank";

        //Define a tag <img> como filho da tag <a> 
        imagemLink.appendChild(imagem);

        //Coloca a tag <img> e a tag <a> dentro da div com id="resultado-pesquisa"
        resultadoDaPesquisa.appendChild(imagemLink);

        
  });

  //Torna visível o botão "Mostrar Mais" após a pesquisa ser feita
  mostrarMaisBtn.style.display = "block";
}

//Evento "submit" ocorre quando o formulário é submetido, o parametro `e` foi adicionado para que possamos acessá-lo e utilizar o preventDefault();
pesquisarForm.addEventListener("submit", (e) =>{

  //Evita que a página seja recarregada quando o formulário é enviado, evitando também a perda de dados do form e etc.
  e.preventDefault();
  pagina = 1;
  pesquisarImagem();

});


mostrarMaisBtn.addEventListener("click", () =>{
  pagina++;
  pesquisarImagem();
});