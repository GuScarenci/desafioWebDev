// Gustavo Moura Scarenci - 12547792
// Site disponível em: https://guscarenci.github.io/desafioWebDev/

// Seleção de elementos do DOM para interação e validação
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var senhaStrengthMeter = document.querySelector("#passStrengthMeter");

var form = document.querySelector("#singleForm");
var formMessage = document.querySelector("#formMessage"); // Seleciona o elemento para mostrar a mensagem do formulário

// Adicionando listeners de eventos que disparam funções de validação quando o usuário deixa o campo de entrada
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Inicializa um flag para determinar se todos os campos são válidos
    var allValid = true;

    // Valida cada campo e verifica se está preenchido
    allValid = validarNome({ target: nome }) && allValid;
    allValid = validarAno({ target: ano }) && allValid;
    allValid = validarEmail({ target: email }) && allValid;
    allValid = validarSenha({ target: senha }) && allValid;

    // Verifica se todos os campos estão preenchidos
    if (nome.value && ano.value && email.value && senha.value && allValid) {
        formMessage.textContent = "Seus dados foram registrados!";
        formMessage.style.color = "green";
    } else {
        formMessage.textContent = "Seus dados não foram registrados!";
        formMessage.style.color = "red";
    }
});

// Função de validação do Nome
function validarNome(e) {
    const regexNome = /^[A-Za-z]+$/;
    if (!e.target.value.match(regexNome) || e.target.value.length <= 6) {
        nomeHelp.textContent = "Nome inválido. Deve conter apenas letras e ser maior que 6 caracteres.";
        nomeHelp.style.color = "red";
        return false;
    } else {
        nomeHelp.textContent = "";
        return true;
    }
}

// Função de validação do Ano de Nascimento
function validarAno(e) {
    const ano = parseInt(e.target.value);
    if (isNaN(ano) || ano < 1900 || ano > 2022) {
        anoHelp.textContent = "Ano inválido. Deve estar entre 1900 e 2022.";
        anoHelp.style.color = "red";
        return false;
    } else {
        anoHelp.textContent = "";
        return true;
    }
}

// Função de validação do Email
function validarEmail(e) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(br|com|net|org)$/;
    if (!e.target.value.match(regexEmail)) {
        emailHelp.textContent = "Formato de email inválido. Deve terminar em .br, .com, .net, ou .org";
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.textContent = "";
        return true;
    }
}

// Função de validação da Senha
function validarSenha(e) {
    const senha = e.target.value;
    const nome = document.querySelector("#inputName").value;
    const ano = document.querySelector("#inputYear").value;
    const regexSenha = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;

    if (!senha.match(regexSenha) || senha.includes(nome) || senha.includes(ano)) {
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        senhaStrengthMeter.value = 0;
        return false;
    } else {
        const length = senha.length;
        const specialCount = (senha.match(/[!@#%&+]/g) || []).length;
        const numberCount = (senha.match(/\d/g) || []).length;
        const upperCaseCount = (senha.match(/[A-Z]/g) || []).length;

        if (length < 8) {
            senhaHelp.textContent = "Senha fraca.";
            senhaStrengthMeter.value = 10;
        } else if (length >= 8 && specialCount >= 1 && numberCount >= 1 && upperCaseCount >= 1) {
            senhaHelp.textContent = "Senha moderada.";
            senhaStrengthMeter.value = 20;
        } else if (length > 12 && specialCount > 1 && numberCount > 1 && upperCaseCount > 1) {
            senhaHelp.textContent = "Senha forte.";
            senhaStrengthMeter.value = 30;
        } else {
            senhaHelp.textContent = "Senha inválida.";
            senhaStrengthMeter.value = 0;
            senhaHelp.style.color = "red";
            return false;
        }
        senhaHelp.style.color = "green";
        return true;
    }
}
