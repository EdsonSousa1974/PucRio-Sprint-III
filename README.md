## Projeto
Este projeto visa implementar um pequeno de cadastro de pessoa, utilizando microsserviço para realizar a busca por CEP. Ao buscar o CEP digitado é esperado trazer o bairro, a cidade e a UF deste CEP. O objetivo aqui é apresetar a utilização de um micro serviço e uma API implementada seguindo o estilo REST.

## As principais tecnologias utilizadas aqui:
Python, JavaScrit, HTML e CSS
Flask
SQLAlchemy
OpenAPI3
SQLite
Docker

Este pequeno projeto faz parte do MVP da  **Puc-Rio - Sprint III  - Do curso de pós graduação em Engenharia de Software** 

## Apresentação do Projeto
https://youtu.be/-PhAvI7iL9Y

## Apresentação do FrontEnd
Desenvolvido em JavaScrit, HTML e CSS
https://youtu.be/IcCn8Aw2DBE

## Apresentação do BackEnd
Desenvolvido em Python
https://youtu.be/WJNNTogJIF0

## Apresentação da API externa https://viacep.com.br
Webservice gratuito e de alto desempenho para consultar Códigos de Endereçamento Postal (CEP) do Brasil.

## Acessando o webservice de CEP - Rota única
Para acessar o webservice, um CEP no formato de {8} dígitos deve ser fornecido, por exemplo: "01001000".
Após o CEP, deve ser fornecido o tipo de retorno desejado, que deve ser "json" ou "xml".
  viacep.com.br/ws/meucep/json/

Exemplo de pesquisa por CEP:
  viacep.com.br/ws/25540260/json/
