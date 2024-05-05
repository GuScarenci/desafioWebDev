// Seleção de elementos do DOM
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var senhaStrengthMeter = document.querySelector("#passStrengthMeter");

// Adição de event listeners para validação
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

// Função de validação do Nome
function validarNome(e) {
    const regexNome = /^[A-Za-z]+$/;  // Apenas letras e espaços permitidos
    if (!e.target.value.match(regexNome) || e.target.value.length <= 6) {
        nomeHelp.textContent = "Nome inválido. Deve conter apenas letras e ser maior que 6 caracteres.";
        nomeHelp.style.color = "red";
    } else {
        nomeHelp.textContent = "";
    }
}

// Função de validação do Ano de Nascimento
function validarAno(e) {
    const ano = parseInt(e.target.value);
    if (isNaN(ano) || ano < 1900 || ano > 2022) {
        anoHelp.textContent = "Ano inválido. Deve estar entre 1900 e 2022.";
        anoHelp.style.color = "red";
    } else {
        anoHelp.textContent = "";
    }
}

// Função de validação do Email
function validarEmail(e) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(br|com|net|org)$/;
    if (!e.target.value.match(regexEmail)) {
        emailHelp.textContent = "Formato de email inválido. Deve terminar em .br, .com, .net, ou .org";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "";
    }
}

// Função de validação da Senha
function validarSenha(e) {
    const senha = e.target.value;
    const nome = document.querySelector("#inputName").value;
    const ano = document.querySelector("#inputYear").value;
    const regexSenha = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;  // Critérios conforme especificado

    if (!senha.match(regexSenha) || senha.includes(nome) || senha.includes(ano)) {
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        senhaStrengthMeter.value = 0;
    } else {
        // Avaliação da força da senha
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
        }
    }
}
