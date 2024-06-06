const campoMinado = document.getElementById("campo-minado");

const largura = 10;
const altura = 10;
const totalBombas = 10;

let tabuleiro = [];
let bombas = [];
let celulasAbertas = 0;

function criarTabuleiro() {
    for (let i = 0; i < altura; i++) {
        tabuleiro[i] = [];
        for (let j = 0; j < largura; j++) {
            tabuleiro[i][j] = { bomba: false, aberta: false, marcada: false, vizinhos: 0 };
        }
    }

    posicionarBombasAleatoriamente();
    calcularBombasVizinhas();
}

function posicionarBombasAleatoriamente() {
  let bombasRestantes = totalBombas;
  while (bombasRestantes > 0) {
      const x = Math.floor(Math.random() * largura);
      const y = Math.floor(Math.random() * altura);

      if (!tabuleiro[y][x].bomba) {
          tabuleiro[y][x].bomba = true;
          bombas.push({ x, y });
          bombasRestantes--;
      }
  }
}

function calcularBombasVizinhas() {
  for (let i = 0; i < altura; i++) {
      for (let j = 0; j < largura; j++) {
          if (!tabuleiro[i][j].bomba) {
              let vizinhos = 0;
              for (let k = -1; k <= 1; k++) {
                  for (let l = -1; l <= 1; l++) {
                      if (i + k >= 0 && i + k < altura && j + l >= 0 && j + l < largura) {
                          if (tabuleiro[i + k][j + l].bomba) {
                              vizinhos++;
                          }
                      }
                  }
              }
              tabuleiro[i][j].vizinhos = vizinhos;
          }
      }
  }
}

// Função para abrir uma célula
function abrirCelula(x, y, event) {
  const celula = tabuleiro[y][x];

  if (event && event.button === 2) {
    event.preventDefault();
    marcarCelula(x, y);
    return;
  }

  if (!celula.aberta && !celula.marcada) {
    celula.aberta = true;
    celulasAbertas++; // Incrementar o contador de células abertas

    if (celula.bomba) {
      campoMinado.children[y * largura + x].classList.add("bomba");
      revelarBombas(); // Revelar todas as bombas quando o jogador perde
      alert("Você perdeu!");
    } else {
      campoMinado.children[y * largura + x].classList.add("aberta");

      if (celula.vizinhos === 0) {
        // Abrir as células vizinhas automaticamente caso não tenham bombas vizinhas
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (x + j >= 0 && x + j < largura && y + i >= 0 && y + i < altura) {
              abrirCelula(x + j, y + i, null);
            }
          }
        }
      }

      // Verificar se o jogador ganhou
      if (celulasAbertas === largura * altura - totalBombas) {
        alert("Você ganhou!");
      }
    }
  }
  
  // Adicionar funcionalidade de contar bombas nas células vizinhas
  const bombasVizinhas = contarBombasVizinhas(x, y);
  if (bombasVizinhas > 0 && !celula.bomba) {
    campoMinado.children[y * largura + x].innerText = bombasVizinhas;
  }

  // Verificar se a célula está marcada e adicionar a classe "bomba" para torná-la vermelha
  if (celula.aberta && celula.marcada) {
    campoMinado.children[y * largura + x].classList.add("bomba");
  }
}

// Função para revelar todas as bombas no tabuleiro
function revelarBombas() {
  for (let {x, y} of bombas) {
    campoMinado.children[y * largura + x].classList.add("bomba");
  }
}

function renderizarCampoMinado() {
  for (let i = 0; i < altura; i++) {
    for (let j = 0; j < largura; j++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");
      celula.setAttribute('data-x', j);
      celula.setAttribute('data-y', i);
      celula.addEventListener("click", () => abrirCelula(j, i));
      celula.addEventListener("contextmenu", (event) => {
        event.preventDefault(); // Evita que o menu de contexto padrão do navegador seja exibido
        marcarCelula(j, i);
      });
      
      campoMinado.appendChild(celula);
    }
  }
}

// Chamando as funções para iniciar o jogo
criarTabuleiro();
renderizarCampoMinado();


// Função para marcar uma célula com uma bandeirinha
function marcarCelula(x, y) {
  const celula = tabuleiro[y][x];

  if (!celula.aberta) {
    const celulaElement = campoMinado.children[y * largura + x];

    if (!celulaElement.classList.contains("marcada")) {
      celulaElement.classList.add("marcada");
      celula.marcada = true;
    } else {
      celulaElement.classList.remove("marcada");
      celula.marcada = false;
    }
  }
}

// Função para contar o número de bombas nas células vizinhas
function contarBombasVizinhas(x, y) {
  let bombasVizinhas = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x + j >= 0 && x + j < largura && y + i >= 0 &&
        y + i < altura) {
          if (tabuleiro[y + i][x + j].bomba) {
            bombasVizinhas++;
          }
        }
      }
    }
    return bombasVizinhas;
  }

  
