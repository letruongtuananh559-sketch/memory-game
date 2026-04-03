const board = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');
const resetBtn = document.getElementById('reset-btn');

let cards = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let lockBoard = false;

function initGame() {
    board.innerHTML = '';
    moves = 0;
    matchedCount = 0;
    moveDisplay.textContent = moves;
    
    // Shuffle
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-back">?</div>
            <div class="card-front">${icon}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains('flip')) return;

    this.classList.add('flip');
    flippedCards.push(this);
    
    moves++;
    moveDisplay.textContent = moves;

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        resetTurn();
        if (matchedCount === cards.length) showVictory();
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

function showVictory() {
    document.getElementById('victory-modal').style.display = 'flex';
    document.getElementById('final-moves').textContent = moves;
}

resetBtn.addEventListener('click', initGame);
initGame();