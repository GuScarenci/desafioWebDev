// Gustavo Moura Scarenci - 12547792
// Site disponível em: https://guscarenci.github.io/desafioWebDev/

// Seleção de elementos do DOM para interação e validação
var nome = document.querySelector("#inputName");  // Seleciona o campo de entrada do nome
var nomeHelp = document.querySelector("#inputNameHelp");  // Seleciona o elemento para mostrar ajuda ou erro para o nome

var ano = document.querySelector("#inputYear");  // Seleciona o campo de entrada do ano
var anoHelp = document.querySelector("#inputYearHelp");  // Seleciona o elemento para mostrar ajuda ou erro para o ano

var email = document.querySelector("#inputEmail");  // Seleciona o campo de entrada do email
var emailHelp = document.querySelector("#inputEmailHelp");  // Seleciona o elemento para mostrar ajuda ou erro para o email

var senha = document.querySelector("#inputPassword");  // Seleciona o campo de entrada da senha
var senhaHelp = document.querySelector("#inputPasswordHelp");  // Seleciona o elemento para mostrar ajuda ou erro para a senha
var senhaStrengthMeter = document.querySelector("#passStrengthMeter");  // Seleciona o medidor de força da senha

// Adicionando listeners de eventos que disparam funções de validação quando o usuário deixa o campo de entrada
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

// Função de validação do Nome
function validarNome(e) {
    const regexNome = /^[A-Za-z]+$/;  // Regex que permite apenas letras (não inclui espaços neste caso)
    if (!e.target.value.match(regexNome) || e.target.value.length <= 6) {
        nomeHelp.textContent = "Nome inválido. Deve conter apenas letras e ser maior que 6 caracteres.";
        nomeHelp.style.color = "red";  // Configura o texto de ajuda para vermelho em caso de erro
    } else {
        nomeHelp.textContent = "";  // Limpa o texto de ajuda se o nome for válido
    }
}

// Função de validação do Ano de Nascimento
function validarAno(e) {
    const ano = parseInt(e.target.value);
    if (isNaN(ano) || ano < 1900 || ano > 2022) {
        anoHelp.textContent = "Ano inválido. Deve estar entre 1900 e 2022.";
        anoHelp.style.color = "red";  // Mostra mensagem de erro em vermelho
    } else {
        anoHelp.textContent = "";  // Limpa o texto de ajuda se o ano for válido
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
    const regexSenha = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;  // Regex que verifica a presença de caracteres especiais, dígitos e letras

    // Verifica se a senha contém o nome ou o ano do usuário ou se não cumpre os requisitos da regex
    if (!senha.match(regexSenha) || senha.includes(nome) || senha.includes(ano)) {
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        senhaStrengthMeter.value = 0;  // Zera o medidor de força da senha
    } else {
        // Avalia a força da senha com base em critérios de comprimento e conteúdo
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