const words = ['JAVASCRIPT', 'PROGRAMMING', 'COMPUTER', 'HANGMAN', 'DEVELOPER', 'ALGORITHM', 'FUNCTION', 'VARIABLE', 'INTERNET', 'KEYBOARD', 'MONITOR', 'SOFTWARE', 'HARDWARE', 'DATABASE', 'NETWORK', 'PYTHON', 'CODING', 'DEBUG', 'COMPILE', 'EXECUTE'];

let currentWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('wordDisplay');
const keyboard = document.getElementById('keyboard');
const wrongCountEl = document.getElementById('wrongCount');
const messageEl = document.getElementById('message');

function initKeyboard() {
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let letter of letters) {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = letter;
        btn.onclick = () => guessLetter(letter, btn);
        keyboard.appendChild(btn);
    }
}

function drawGallows() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(150, 280);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(50, 280);
    ctx.lineTo(50, 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();
}

function drawHangman(stage) {
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#e74c3c';
    
    switch(stage) {
        case 1:
            ctx.beginPath();
            ctx.arc(150, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.ellipse(150, 120, 15, 35, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(120, 130);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(180, 130);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(150, 155);
            ctx.lineTo(130, 200);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(150, 155);
            ctx.lineTo(170, 200);
            ctx.stroke();
            break;
    }
}

function displayWord() {
    wordDisplay.innerHTML = '';
    for (let letter of currentWord) {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        slot.textContent = guessedLetters.includes(letter) ? letter : '';
        wordDisplay.appendChild(slot);
    }
}

function guessLetter(letter, btn) {
    if (gameOver || guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);
    btn.disabled = true;
    
    if (currentWord.includes(letter)) {
        displayWord();
        checkWin();
    } else {
        wrongGuesses++;
        wrongCountEl.textContent = wrongGuesses;
        btn.classList.add('wrong');
        drawHangman(wrongGuesses);
        checkLose();
    }
}

function checkWin() {
    const allGuessed = currentWord.split('').every(letter => guessedLetters.includes(letter));
    
    if (allGuessed) {
        gameOver = true;
        messageEl.textContent = '🎉 You Won!';
        messageEl.className = 'message win';
        disableAllKeys();
    }
}

function checkLose() {
    if (wrongGuesses >= 6) {
        gameOver = true;
        messageEl.textContent = `💀 Game Over! The word was: ${currentWord}`;
        messageEl.className = 'message lose';
        displayWord();
        disableAllKeys();
    }
}

function disableAllKeys() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.disabled = true);
}

function newGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGallows();
    
    wrongCountEl.textContent = '0';
    messageEl.textContent = '';
    messageEl.className = 'message';
    
    displayWord();
    initKeyboard();
}

newGame();