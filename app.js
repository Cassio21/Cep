const mensagemErro = document.querySelector("#mensagemErro");
const cepbusca = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar = document.querySelector("#botao_buscar");
const btnLimpar = document.querySelector("#botao_limpar");
const btnSalvar = document.querySelector("#botao_salvar");
let endereco;

btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    validaCEP();
  } catch (erro) {
    mensagemErro.innerHTML = erro.message;
  }
});

btnLimpar.addEventListener("click", () => {
  limparCampos();
});

btnSalvar.addEventListener("click", () => {
  alert("Dados salvos com sucesso!!!");
  limparCampos();
});

const buscarEndereco = () => {
  fetch(`https://viacep.com.br/ws/${cepbusca.value}/json`)
    .then((resposta) => {
      return resposta.json();
    })
    .then((endereco) => {
      preencheCampo(endereco);
    })
    .catch((erro) => {
      console.error(erro);
    });
};

const preencheCampo = (endereco) => {
  for (const campo in endereco) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = endereco[campo];
    }
  }
};

const validaCEP = () => {
  const regexCep = /^[0-9]{8}$/;
  if (regexCep.test(cepbusca.value)) {
    buscarEndereco();
  } else {
    throw new Error("Digite um CEP válido.");
  }
};

const limparCampos = () => {
  cepbusca.value = "";
  logradouro.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
  mensagemErro.innerHTML = "";
};
