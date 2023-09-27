/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pessoas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      limparDados()
      data.pessoas.forEach(pessoa => insertList(pessoa.nome, pessoa.cpf, pessoa.telefone, pessoa.cep, pessoa.bairro, pessoa.cidade, pessoa.uf))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar uma pessoa na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postPessoa = async (inputNome, inputCPF, inputTelefone, inputCEP, inputBairro, inputCidade, inputUF) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('cpf', inputCPF);
  formData.append('telefone', inputTelefone);
  formData.append('cep', inputCEP);
  formData.append('bairro', inputBairro);
  formData.append('cidade', inputCidade);
  formData.append('uf', inputUF);

  let url = 'http://127.0.0.1:5000/pessoa';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada pessoa da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover uma pessoa da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomePessoa = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deletePessoa(nomePessoa)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar uma pessoa da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deletePessoa = (pessoa) => {
  console.log(pessoa)
  let url = 'http://127.0.0.1:5000/pessoa?nome=' + pessoa;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para bucar uma pessoa da lista
  --------------------------------------------------------------------------------------
*/
function buscarPessoa() {
  let input = document.querySelectorAll("#getNome");
  let pessoa
  for (let k = 0; k < input.length; k++) {
    pessoa = input[k].value;           // Salva o valor do campo aqui         }
  }

  let url = 'http://127.0.0.1:5000/pessoa?nome=' + pessoa;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.nome);
      limparDados();
      insertList(data.nome, data.cpf, data.telefone, data.cep, data.bairro, data.cidade, data.uf);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar exibição de dados da tabela
  --------------------------------------------------------------------------------------
*/
function limparDados() {
  var table = document.getElementById('myTable');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova pessoa, seu cpf e telefone
  --------------------------------------------------------------------------------------
*/
const newPessoa = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputCPF = document.getElementById("newCPF").value;
  let inputTelefone = document.getElementById("newTelefone").value;
  let inputCEP = document.getElementById("newCEP").value;
  let inputBairro = document.getElementById("newBairro").value;
  let inputCidade = document.getElementById("newCidade").value;
  let inputUF = document.getElementById("newUF").value;

  if (inputNome === '') {
    alert("Escreva o nome de uma pessoal!");
  } else if (isNaN(inputCPF) || isNaN(inputTelefone)) {
    alert("CPF e telefone precisa ser somente números!");
  } else {
    insertList(inputNome, inputCPF, inputTelefone, inputCEP, inputBairro, inputCidade, inputUF)
    postPessoa(inputNome, inputCPF, inputTelefone, inputCEP, inputBairro, inputCidade, inputUF)
    alert("Pessoa adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir pessoas na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (cpf, nome, telefone, cep, bairro, cidade, uf) => {
  var pessoa = [cpf, nome, telefone, cep, bairro, cidade, uf]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < pessoa.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = pessoa[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newCPF").value = "";
  document.getElementById("newNome").value = "";
  document.getElementById("newTelefone").value = "";
  document.getElementById("newCEP").value = "";
  document.getElementById("newBairro").value = "";
  document.getElementById("newCidade").value = "";
  document.getElementById("newUF").value = "";
  
  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para bucar um CEP
  --------------------------------------------------------------------------------------
*/
function buscarCEP() {
  let input = document.querySelectorAll("#newCEP");
  let cep
  for (let k = 0; k < input.length; k++) {
    cep = input[k].value;           // Salva o valor do campo aqui         }
  }
  
  let url = 'http://127.0.0.1:5000/cep?cep=' + cep;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.cep);
      document.getElementById("newCEP").value = data.cep;
      document.getElementById("newBairro").value = data.bairro;
      document.getElementById("newCidade").value = data.localidade;
      document.getElementById("newUF").value = data.uf;    
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById('bairro').value=(conteudo.bairro);
      document.getElementById('cidade').value=(conteudo.localidade);
      document.getElementById('uf').value=(conteudo.uf);

      document.getElementById("newCEP").value = conteudo.cep;
      document.getElementById("newBairro").value = conteudo.bairro;
      document.getElementById("newCidade").value = conteudo.localidade;
      document.getElementById("newUF").value = conteudo.uf;    
  } //end if.
  else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
  }
}
  
function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

          //Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById('bairro').value="...";
          document.getElementById('cidade').value="...";
          document.getElementById('uf').value="...";
          document.getElementById("newCEP").value = "";
          document.getElementById("newBairro").value = "";
          document.getElementById("newCidade").value = "";
          document.getElementById("newUF").value = "";
        
          //Cria um elemento javascript.
          var script = document.createElement('script');

          //Sincroniza com o callback.
          script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

          //Insere script no documento e carrega o conteúdo.
          document.body.appendChild(script);

      } //end if.
      else {
          //cep é inválido.
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
      }
  } //end if.
  else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
  }
}
