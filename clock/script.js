const hora = document.querySelector('.hora');
const minuto = document.querySelector('.minuto');
const segundo = document.querySelector('.segundo');


function semTempoIrmao() {
    const tempo = new Date();
    /* 'Date' importa funções de tempo para nosso js. */

    const horaRotacao = (360 / 12) * tempo.getHours();
    /* horaRotacao = 360 graus divido por 
    12 horas e multiplicado por hora atual */
    const minutoRotacao = (360 / 60) * tempo.getMinutes();
    const segundoRotacao = (360 / 60) * tempo.getSeconds();

    hora.style.transform = `rotate(${horaRotacao}deg)`
    /* troca o style (css) da hora para rotacionar 
    a quantidade que estiver dentro do "horaRotacao" */
    minuto.style.transform = `rotate(${minutoRotacao}deg)`
    segundo.style.transform = `rotate(${segundoRotacao}deg)`
}

semTempoIrmao();

setInterval(semTempoIrmao, 1000); // milisegundos 
