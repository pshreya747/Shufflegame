const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆'];
const cards = [...emojis, ...emojis, ...emojis];
let flipperCards = [];
let matchCards = [];
let clickDisabled = false;

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span class="hidden">${emoji}</span>`;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card) {
    if (clickDisabled || card === flipperCards[0]) return;
    card.firstChild.classList.remove('hidden');
    flipperCards.push(card);
    if (flipperCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function flipBack(card) {
    card.firstChild.classList.add('hidden');
    let index = flipperCards.indexOf(card);
    flipperCards.splice(index, 1);
}

function checkMatch() {
    if (flipperCards[0].innerHTML !== flipperCards[1].innerHTML) {
        flipBack(flipperCards[0]);
        flipBack(flipperCards[1]);
    } else {
        matchCards.push(...flipperCards);
    }
    flipperCards = [];
    clickDisabled = false;
    if (matchCards.length === cards.length) {
        alert('You won the game!');
    }
}

shuffle(cards);
cards.forEach(emoji => document.getElementById('game-container').appendChild(createCard(emoji)));