const avatarChoisi = localStorage.getItem('avatar');
const avatarImg = document.getElementById('avatar-selected');

if (avatarChoisi && avatarImg) {
    avatarImg.src = `../assets/images/${avatarChoisi}.jpg`;
}


const baseProfiles = [
    { id: 1, name: "Luca", image: "../assets/images/luca.png", matchable: true },
    { id: 2, name: "Dirck", image: "../assets/images/dirck.png", matchable: true },
    { id: 3, name: "Art mystère", image: "../assets/images/card.svg", matchable: true },
    { id: 4, name: "Emma", image: "../assets/images/card.svg", matchable: true },
    { id: 5, name: "Lucas", image: "../assets/images/card.svg", matchable: true },
    { id: 6, name: "Nina", image: "../assets/images/card.svg", matchable: true },

    { id: 7, name: "Paul", image: "../assets/images/card.svg", matchable: false },
    { id: 8, name: "Leo", image: "../assets/images/card.svg", matchable: false },
    { id: 9, name: "Maya", image: "../assets/images/card.svg", matchable: false },
    { id: 10, name: "Hugo", image: "../assets/images/card.svg", matchable: false },
    { id: 11, name: "Anna", image: "../assets/images/card.svg", matchable: false },
    { id: 12, name: "Noah", image: "../assets/images/card.svg", matchable: false },
    { id: 13, name: "Jade", image: "../assets/images/card.svg", matchable: false },
    { id: 14, name: "Eva", image: "../assets/images/card.svg", matchable: false },
    { id: 15, name: "Tom", image: "../assets/images/card.svg", matchable: false }
];


function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function getRandomPercent() {
    return Math.floor(Math.random() * 100) + 1;
}

function getRandomMatchRate() {
    return Math.floor(Math.random() * 50) + 30;
}


let cardsData = [];
let currentIndex = 0;

function initGame() {
    const matchables = baseProfiles.filter(p => p.matchable);
    const nonMatchables = baseProfiles.filter(p => !p.matchable);

    if (nonMatchables.length < 2) {
        console.error("Il faut au moins 2 cartes non-matchables");
        return;
    }

    const shuffledNonMatchables = shuffle(nonMatchables);

    const firstCards = shuffledNonMatchables.slice(0, 2);

    const remainingCards = shuffle([
        ...shuffledNonMatchables.slice(2),
        ...matchables
    ]);

    cardsData = [...firstCards, ...remainingCards].map(profile => ({
        ...profile,
        matchRate: profile.matchable ? getRandomMatchRate() : 0
    }));

    currentIndex = 0;
}



const cardStack = document.getElementById('card-stack');


initGame();
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

    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        swipe(card, 'right');
    });

    nopeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        swipe(card, 'left');
    });

    addSwipe(card);
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
        checkMatch();
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
}


function checkMatch() {
    const profile = cardsData[currentIndex - 1];

    if (!profile.matchable) {
        console.log(`❌ ${profile.name} → non matchable (hors salle)`);
        return;
    }

    const roll = getRandomPercent();

    console.log(`🎲 ${profile.name} → ${roll} / ${profile.matchRate}`);

    if (roll <= profile.matchRate) {
        showMatch(profile);
    }
}

function showMatch(profile) {
    console.log(`💖 MATCH avec ${profile.name}`);
    setTimeout(() => {
        document.location.href = "/pages/match.html";
    }, 2500);
}


function getX(e) {
    return e.type.includes('mouse')
        ? e.clientX
        : e.touches[0].clientX;
}
