var numeroParaEncontrar = 0; // Declara uma variável para armazenar o número a ser encontrado.
var tentativas = 0; // Declara uma variável para contar o número de tentativas.

function atualizar() {
    var elemento = document.getElementById('inputNumero'); // Obtém a referência a um elemento HTML com o ID 'inputNumero'.
    elemento.value = ''; // Limpa o valor desse elemento.

    numeroParaEncontrar = parseInt(Math.random() * 100); // Gera um número aleatório de 0 a 99 e o atribui a 'numeroParaEncontrar'.

    console.log('The number to find: ' + numeroParaEncontrar); // Exibe o número a ser encontrado no console.
}

atualizar(); // Chama a função 'atualizar' para inicializar o jogo.

function verificaNumeros() {
    var elemento = document.getElementById('inputNumero'); // Obtém a referência ao elemento HTML com o ID 'inputNumero'.
    var numero = elemento.value; // Obtém o valor inserido pelo usuário.

    if (numero > 100 || numero < 0) {
        alert('Aposta é inválida'); // Se o número estiver fora do intervalo permitido, exibe um alerta de aposta inválida.
        return; // Encerra a função.
    }

    if (numero > numeroParaEncontrar) {
        tentativas++; // Incrementa o contador de tentativas.
        alert('🚨 O número para ser encontrado é MENOR'); // Exibe um alerta indicando que o número a ser encontrado é menor.
    } else if (numero < numeroParaEncontrar) {
        tentativas++; // Incrementa o contador de tentativas.
        alert('🚨 O número para ser encontrado é MAIOR'); // Exibe um alerta indicando que o número a ser encontrado é maior.
    } else {
        alert('✅ Parabéns você acertou!! Com ' + tentativas + ' erros!'); // Exibe um alerta parabenizando o jogador pela vitória.
        refresh(); // Suponho que 'refresh' seja uma função que reinicia o jogo (não está definida no código fornecido).
    }
}
