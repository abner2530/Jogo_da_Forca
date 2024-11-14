# Jogo da Forca

Este é um jogo da forca desenvolvido em Golang para o back-end e JavaScript para o front-end. O objetivo é adivinhar uma palavra oculta, tentando uma letra de cada vez. A cada erro, uma nova parte do boneco é desenhada até o limite de seis erros, completando o boneco. O jogo termina quando o jogador adivinha a palavra ou atinge o limite de erros.

## Funcionalidades

- **Interface Gráfica**: O jogador interage com o jogo através de uma página web, onde são exibidos botões para cada letra do alfabeto.
- **Desenho Progressivo**: A cada erro, uma nova parte do boneco é desenhada até o limite de seis partes (cabeça, corpo, braços e pernas).
- **Indicação de Vitória ou Derrota**: O jogo exibe uma mensagem de vitória quando a palavra é adivinhada e de derrota quando o número máximo de erros é atingido.
- **Reiniciar Jogo**: Um botão "Novo Jogo" permite iniciar uma nova partida sem a necessidade de atualizar a página.

## Tecnologias Utilizadas

- **Back-End**: Golang com o framework Echo para servir as rotas de API.
- **Front-End**: HTML, CSS e JavaScript para renderização e interação com o jogo.
- **Canvas API**: Utilizado para desenhar o boneco na forca no navegador.

## Estrutura do Projeto

Jogo_da_Forca/ ├── main.go # Código fonte do back-end em Golang ├── static/ # Diretório para arquivos estáticos do front-end │ ├── index.html # Página principal do front-end │ ├── style.css # Arquivo de estilos CSS │ └── script.js # Arquivo de lógica de interação do jogo └── README.md # Documentação do projeto

### Descrição dos Arquivos

- **`main.go`**: Contém o código-fonte do servidor em Golang, utilizando o framework Echo para configurar rotas de API e servir a aplicação.
- **`static/`**: Diretório onde ficam os arquivos do front-end.
  - **`index.html`**: Página HTML do jogo, exibindo o layout, botões de letras, e a interface do jogador.
  - **`style.css`**: Define o estilo da interface, como o layout e a posição dos elementos.
  - **`script.js`**: Controla a lógica do jogo no front-end, enviando solicitações para o back-end, manipulando o estado do jogo e atualizando o desenho do boneco na tela.
- **`README.md`**: Documentação do projeto, contendo instruções de configuração, execução, e detalhes de funcionalidade.

Essa estrutura organiza de forma eficiente os arquivos de front-end e back-end em diretórios separados, facilitando a manutenção e a escalabilidade do projeto.

## Requisitos

- **Golang** (versão 1.16 ou superior)
- **Echo Framework**: Instale com `go get github.com/labstack/echo/v4`
- **Navegador Web** para rodar o front-end

## Como Executar o Jogo

1. Clone o repositório e navegue até o diretório do projeto:
   ```bash
   git clone https://github.com/seuusuario/Jogo_da_Forca.git
   cd Jogo_da_Forca
   ```
