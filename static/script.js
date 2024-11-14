const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetDiv = document.querySelector('.alphabet');
const wordDisplay = document.getElementById('word-display');
const hangmanCanvas = document.getElementById('hangman');
const ctx = hangmanCanvas.getContext('2d');
let mistakes = 0;
let gameOver = false;

alphabet.forEach(letter => {
  const btn = document.createElement('button');
  btn.textContent = letter.toUpperCase();
  if (letter === 'n') alphabetDiv.appendChild(document.createElement('br'));
  btn.onclick = () => submitLetter(letter);
  alphabetDiv.appendChild(btn);
});

async function fetchWord() {
  const response = await fetch('/word');
  const text = await response.text();
  wordDisplay.textContent = text;
  mistakes = 0;
  gameOver = false;
  enableButtons();
  drawHangman();
}

async function submitLetter(letter) {
  if (gameOver) return;
  const response = await fetch('/word', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ letter })
  });
  const text = await response.text();
  wordDisplay.textContent = text;

  if (!text.includes(letter.toUpperCase()) && !text.includes(letter.toLowerCase())) {
    mistakes++;
    drawHangman();
  }

  if (mistakes >= 6 || text.includes("Você perdeu")) {
    gameOver = true;
    disableButtons();
  }
}

async function startNewGame() {
  const response = await fetch('/word/new');
  const text = await response.text();
  wordDisplay.textContent = text;
  mistakes = 0;
  gameOver = false;
  enableButtons();
  drawHangman();
}

function drawHangman() {
  ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);
  ctx.lineTo(120, 20);
  ctx.lineTo(120, 40);
  ctx.stroke();

  if (mistakes > 0) {
    ctx.beginPath();
    ctx.arc(120, 60, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (mistakes > 1) {
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(120, 140);
    ctx.stroke();
  }
  if (mistakes > 2) {
    ctx.beginPath();
    ctx.moveTo(120, 100);
    ctx.lineTo(100, 120);
    ctx.stroke();
  }
  if (mistakes > 3) {
    ctx.beginPath();
    ctx.moveTo(120, 100);
    ctx.lineTo(140, 120);
    ctx.stroke();
  }
  if (mistakes > 4) {
    ctx.beginPath();
    ctx.moveTo(120, 140);
    ctx.lineTo(100, 180);
    ctx.stroke();
  }
  if (mistakes > 5) {
    ctx.beginPath();
    ctx.moveTo(120, 140);
    ctx.lineTo(140, 180);
    ctx.stroke();
  }
}

function disableButtons() {
  document.querySelectorAll('.alphabet button').forEach(btn => btn.disabled = true);
}

function enableButtons() {
  document.querySelectorAll('.alphabet button').forEach(btn => btn.disabled = false);
}

fetchWord();
