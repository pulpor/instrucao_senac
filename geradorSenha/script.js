let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");

let sizePassword = document.querySelector("#valor");
let password = document.querySelector("#password");

let containerPassword = document.querySelector("#container-password");

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#"$%¨&*()_+/*-.;/:?';
let novaSenha = '';

sizePassword.innerHTML = sliderElement.value;

slider.oninput = function() {  // on input = quando o cliente coloca informação nova 
  sizePassword.innerHTML = this.value;
}

function generatePassword() {
    let pass = ''; // Variável para armazenar a senha gerada
    
    // Um loop para criar a senha com base no valor do slider
    for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
      // Adiciona caracteres aleatórios à senha
      pass += charset.charAt(Math.floor(Math.random() * n));
    }
    
    // Mostra a senha gerada na página HTML
    containerPassword.classList.remove("hide"); // Remove a classe "hide" para mostrar a senha
    password.innerHTML = pass; // Define o conteúdo do elemento HTML com a senha gerada
    novaSenha = pass; // Armazena a senha em uma variável chamada novaSenha
  }
  

function copyPassword(){
  alert("Senha copiada com sucesso!")
  navigator.clipboard.writeText(novaSenha);
}