## Meu Front
Este pequeno projeto faz parte do MVP da  **Puc-Rio - Sprint III  - Do curso de pós graduação em Engenharia de Software** 

Este projeto visa implementar um pequeno de cadastro de pessoa, utilizando um micro serviço para realizar a busca por CEP. Ao buscar o CEP digitado é esperado trazer o bairro, a cidade e a UF deste CEP. O objetivo aqui é apresetar a utilização de um micro serviço e uma API implementada seguindo o estilo REST.

## Para persistir os dados em banco de dados
O servidor local das APIs deverá estar em execução.

## Como executar em desenvolvimento
Basta fazer o download do projeto e abrir o arquivo index.html no seu browser. 

## Como executar através do Docker
Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e Execute como administrador o seguinte comando para construir a imagem Docker:

$ docker build -t novoapp .

Criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:

$ docker run -it --rm -d -p 8080:80 --name novoapp -v ~/site-content:/usr/share/nginx/html novoapp

Uma vez executando, para acessar o front-end, basta abrir o http://localhost:8080/#/ no navegador.

## Uso da API externa https://viacep.com.br

Webservice gratuito e de alto desempenho para consultar Códigos de Endereçamento Postal (CEP) do Brasil.

## Acessando o webservice de CEP - Rota única
Para acessar o webservice, um CEP no formato de {8} dígitos deve ser fornecido, por exemplo: "01001000".
Após o CEP, deve ser fornecido o tipo de retorno desejado, que deve ser "json" ou "xml".
  viacep.com.br/ws/meucep/json/

Exemplo de pesquisa por CEP:
  viacep.com.br/ws/25540260/json/
