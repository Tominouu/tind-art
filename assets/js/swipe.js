const avatarChoisi = localStorage.getItem('avatar');
const avatarImg = document.getElementById('avatar-selected');

if (avatarChoisi && avatarImg) {
    avatarImg.src = `../assets/images/${avatarChoisi}.jpg`;
}

const cardsData = [
    { image: '../assets/images/luca.png' },
    { image: '../assets/images/dirck.png' },
    { image: '../assets/images/card.svg' }
];

const cardStack = document.getElementById('card-stack');
let currentIndex = 0;

loadNextCard();
loadNextCard(); 

function createCard(data) {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.backgroundImage = `url(${data.image})`;

    card.innerHTML = `
        <div class="overlay like-overlay">LIKE</div>
        <div class="overlay nope-overlay">NOPE</div>

        <div class="choices">
            <button class="choice-btn nope">
                <img src="../assets/images/next.svg" alt="Passer">
            </button>
            <button class="choice-btn like">
                <img src="../assets/images/like.svg" alt="Aimer">
            </button>
        </div>
    `;

    const likeBtn = card.querySelector('button.like');
    const nopeBtn = card.querySelector('button.nope');

    // Désactive le swipe pendant le clic
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        swipe(card, 'right');
    });

    nopeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        swipe(card, 'left');
    });

    addSwipe(card); // swipe tactile/mouse

    return card;
}

function loadNextCard() {
    if (currentIndex >= cardsData.length) return;

    const card = createCard(cardsData[currentIndex]);
    card.style.zIndex = 10 - currentIndex;
    cardStack.appendChild(card);

    currentIndex++;
}

function addSwipe(card) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    const threshold = 100;

    card.addEventListener('touchstart', start);
    card.addEventListener('touchmove', move);
    card.addEventListener('touchend', end);

    card.addEventListener('mousedown', start);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseup', end);
    card.addEventListener('mouseleave', end);

    function start(e) {
        if (e.target.closest('button')) return;
        dragging = true;
        startX = getX(e);
        card.style.transition = 'none';
    }

    function move(e) {
        if (!dragging) return;
        currentX = getX(e);
        const dx = currentX - startX;
        const rotation = dx * 0.05;

        card.style.transform = `translateX(${dx}px) rotate(${rotation}deg)`;

        const likeOverlay = card.querySelector('.like-overlay');
        const nopeOverlay = card.querySelector('.nope-overlay');
        const opacity = Math.min(Math.abs(dx) / 120, 1);

        if (dx > 0) {
            likeOverlay.style.opacity = opacity;
            nopeOverlay.style.opacity = 0;
        } else {
            nopeOverlay.style.opacity = opacity;
            likeOverlay.style.opacity = 0;
        }
    }

    function end() {
        if (!dragging) return;
        dragging = false;

        const dx = currentX - startX;
        card.style.transition = 'transform 0.3s ease';

        if (dx > threshold) swipe(card, 'right');
        else if (dx < -threshold) swipe(card, 'left');
        else {
            card.style.transform = 'translateX(0)';
            card.querySelector('.like-overlay').style.opacity = 0;
            card.querySelector('.nope-overlay').style.opacity = 0;
        }
    }
}

function swipe(card, direction) {
    const moveX = direction === 'right' ? 120 : -120;

    const likeOverlay = card.querySelector('.like-overlay');
    const nopeOverlay = card.querySelector('.nope-overlay');

    if (direction === 'right') {
        likeOverlay.style.opacity = 1;
        nopeOverlay.style.opacity = 0;
    } else {
        nopeOverlay.style.opacity = 1;
        likeOverlay.style.opacity = 0;
    }

    card.style.transition = 'transform 0.3s ease';
    card.style.transform = `translateX(${moveX}vw) rotate(${moveX / 6}deg)`;

    setTimeout(() => {
        card.remove();
        loadNextCard();
    }, 300);

    console.log(direction === 'right' ? 'LIKE ❤️' : 'NOPE ❌');
}

function getX(e) {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}
