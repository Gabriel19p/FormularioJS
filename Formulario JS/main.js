document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector('#formulario');
  const nomeInput = document.querySelector('#nome');
  const sobrenomeInput = document.querySelector('#sobrenome');
  const loginInput = document.querySelector('#login');
  const senhaInput = document.querySelector('#senha');
  const emailInput = document.querySelector('#email');
  const cepInput = document.querySelector('#cep');
  const enderecoInput = document.querySelector('#endereco');
  const complementoInput = document.querySelector('#complemento');
  const bairroInput = document.querySelector('#bairro');
  const cidadeInput = document.querySelector('#cidade');
  const estadoInput = document.querySelector('#estado');
  const githubInput = document.querySelector('#github');
  const academiaInput = document.querySelector('#academia');
  const professorInput = document.querySelector('#professor');
  const termosInput = document.querySelector('#termos');
  const infoInput = document.querySelector('#info');
  const tabelaDados = document.querySelector('#tabela-dados');

  // Função para gerar o login automaticamente
  function gerarLogin() {
    const nome = nomeInput.value.toLowerCase().trim();
    const sobrenome = sobrenomeInput.value.toLowerCase().trim();
    const login = nome + '.' + sobrenome;
    loginInput.value = login.replace(/\s/g, '');

    // Atualizar o estado do checkbox de concordância com os termos
    const termosCheckbox = document.getElementById('termos');
    const textarea = document.querySelector('textarea');
    const isScrolledToBottom = textarea.scrollTop + textarea.clientHeight === textarea.scrollHeight;
    termosCheckbox.disabled = !isScrolledToBottom;
  }

  // Função para preencher os dados do endereço
  async function preencherEndereco() {
    const cep = cepInput.value.trim();
    const cepErro = document.querySelector('#cep-erro');
    cepErro.classList.add('d-none');

    if (cep.length !== 8) {
      cepErro.classList.remove('d-none');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        cepErro.classList.remove('d-none');
      } else {
        enderecoInput.value = data.logradouro;
        bairroInput.value = data.bairro;
        cidadeInput.value = data.localidade;
        estadoInput.value = data.uf;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Função para exibir os dados do formulário na tabela
  function exibirDados() {

    const dados = [
      document.getElementById('t-nome').textContent = nomeInput.value,
      document.getElementById('t-sobrenome').textContent = sobrenomeInput.value,
      document.getElementById('t-login').textContent = loginInput.value,
      document.getElementById('t-senha').textContent = senhaInput.value,
      document.getElementById('t-email').textContent = emailInput.value,
      document.getElementById('t-cep').textContent = cepInput.value,
      document.getElementById('t-endereco').textContent = enderecoInput.value,
      document.getElementById('t-bairro').textContent = bairroInput.value,
      document.getElementById('t-cidade').textContent = cidadeInput.value,
      document.getElementById('t-estado').textContent = estadoInput.value,
      document.getElementById('t-complemento').textContent = complementoInput.value,
      document.getElementById('t-github').textContent = githubInput.value,
      document.getElementById('t-academia').textContent = academiaInput.value,
      document.getElementById('t-professor').textContent = professorInput.value,
      document.getElementById('t-termos').textContent = termosInput.value,
      document.getElementById('t-info').textContent = infoInput.value,
    ];

    const tr = document.createElement('tr');
    dados.forEach(function (dado) {
      const td = document.createElement('td');
      td.textContent = dado;
      tr.appendChild(td);
    });

    tabelaDados.querySelector('tbody').appendChild(tr);
  }

  // Limpar o formulário e exibir alerta após salvar
  function limparFormulario() {
    formulario.reset();
    alert('As informações foram salvas.');
  }

  // Adicionar os event listeners
  nomeInput.addEventListener('input', gerarLogin);
  sobrenomeInput.addEventListener('input', gerarLogin);
  cepInput.addEventListener('input', preencherEndereco);
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    exibirDados();
    limparFormulario();
  });

  //Habilitar checkbox após a barra de rolagem chegar ao final do textarea
  const termosCheckbox = document.querySelector('#termos');
  const textarea = document.querySelector('textarea');

  textarea.addEventListener('scroll', function () {
    if (textarea.scrollTop + textarea.clientHeight === textarea.scrollHeight) {
      termosCheckbox.disabled = false;
    }
  });
});
