const avatarChoisi = localStorage.getItem('avatar');
const avatarImg = document.getElementById('avatar-selected');

if (avatarChoisi && avatarImg) {
    avatarImg.src = `../assets/images/${avatarChoisi}.jpg`;
}


const baseProfiles = [
    { id: 1, name: "Luca", image: "../assets/images/luca.png", infoImage: "../assets/images/description-luca.png", matchable: true },
    { id: 2, name: "Dirck", image: "../assets/images/dirck.png", infoImage: "../assets/images/description-dirck.png", matchable: true },
    { id: 3, name: "Art mystère", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png",  matchable: true },
    { id: 4, name: "Emma", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: true },
    { id: 5, name: "Lucas", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: true },
    { id: 6, name: "Nina", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: true },

    { id: 7, name: "Paul", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 8, name: "Leo", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 9, name: "Maya", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 10, name: "Hugo", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 11, name: "Anna", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 12, name: "Noah", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 13, name: "Jade", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 14, name: "Eva", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false },
    { id: 15, name: "Tom", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: false }
];


function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
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
        <img src="../assets/images/like-overlay.svg" alt="Logo" class="overlay like-overlay"></img>
        <img src="../assets/images/nope-overlay.svg" alt="Logo" class="overlay nope-overlay"></img>

        <div class="choices">
            <button class="choice-btn nope">
                <img src="../assets/images/next.svg" class="next" alt="Passer Before">
                <img src="../assets/images/next-after.svg" class="next-after" alt="Passer After">
            </button>
            <button class="choice-btn like">
                <img src="../assets/images/like.svg" class="like" alt="Aimer Before">
                <img src="../assets/images/like-after.svg" class="like-after" alt="Aimer After">
            </button>
        </div>

        <div class="card-info">
            <img src="${data.infoImage}" alt="Description ${data.name}">
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
    addInfoPanelDrag(card);
    return card;
}



function loadNextCard() {
    if (currentIndex >= cardsData.length) return;

    const card = createCard(cardsData[currentIndex]);
    card.style.zIndex = 10 - currentIndex;
    cardStack.appendChild(card);

    currentIndex++;
}


/* =========================
   ✅ SWIPE CORRIGÉ ICI
========================= */
function addSwipe(card) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let dragging = false;
    let lockedAxis = null;

    const threshold = 100;
    const LOCK_DISTANCE = 12;

    const likeOverlay = card.querySelector('.like-overlay');
    const nopeOverlay = card.querySelector('.nope-overlay');

    card.addEventListener('touchstart', start, { passive: true });
    card.addEventListener('touchmove', move, { passive: false });
    card.addEventListener('touchend', end);

    card.addEventListener('mousedown', start);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseup', end);
    card.addEventListener('mouseleave', end);

    resetUI();

    function start(e) {
        if (e.target.closest('.card-info')) return;
        if (e.target.closest('button')) return;

        dragging = true;
        lockedAxis = null;
        startX = getX(e);
        startY = getY(e);
        currentX = 0;

        card.style.transition = 'none';
    }

    function move(e) {
        if (!dragging) return;

        const dx = getX(e) - startX;
        const dy = getY(e) - startY;

        if (!lockedAxis) {
            if (Math.abs(dx) < LOCK_DISTANCE && Math.abs(dy) < LOCK_DISTANCE) return;
            lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }

        if (lockedAxis === 'y') return;

        currentX = dx;
        card.style.transform = `translateX(${dx}px) rotate(${dx * 0.05}deg)`;

        resetUI();

        if (dx > 0) {
            // 👉 LIKE
            card.classList.add('is-like');
            likeOverlay.style.opacity = Math.min(dx / threshold, 1);
        } 
        else if (dx < 0) {
            // 👉 NEXT
            card.classList.add('is-nope');
            nopeOverlay.style.opacity = Math.min(Math.abs(dx) / threshold, 1);
        }

        e.preventDefault();
    }

    function end() {
        dragging = false;
        card.style.transition = 'transform 0.3s ease';

        if (currentX > threshold) {
            swipe(card, 'right');
        }
        else if (currentX < -threshold) {
            swipe(card, 'left');
        }
        else {
            card.style.transform = 'translateX(0)';
            resetUI();
        }
    }

    function resetUI() {
        card.classList.remove('is-like', 'is-nope');
        likeOverlay.style.opacity = 0;
        nopeOverlay.style.opacity = 0;
    }
}





function swipe(card, direction) {
    const moveX = direction === 'right' ? 120 : -120;

    card.classList.remove('is-like', 'is-nope');
    card.classList.add(direction === 'right' ? 'is-like' : 'is-nope');

    const likeOverlay = card.querySelector('.like-overlay');
    const nopeOverlay = card.querySelector('.nope-overlay');

    likeOverlay.style.opacity = direction === 'right' ? 1 : 0;
    nopeOverlay.style.opacity = direction === 'left' ? 1 : 0;

    if (direction === 'right') {
        checkMatch();
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
        console.log(`❌ ${profile.name} → hors salle`);
        return;
    }

    showMatch(profile);
}


function showMatch(profile) {
    console.log(`💖 MATCH avec ${profile.name}`);
    setTimeout(() => {
        document.location.href = "/pages/match.html";
    }, 500);
}


function getX(e) {
    return e.type.includes('mouse')
        ? e.clientX
        : e.touches[0].clientX;
}

function getY(e) {
    return e.type.includes('mouse')
        ? e.clientY
        : e.touches[0].clientY;
}

function addInfoPanelDrag(card) {
    const panel = card.querySelector('.card-info');

    let startY = 0;
    let currentY = 0;
    let panelStart = 0;
    let dragging = false;

    const CLOSED = 90;
    const OPEN = 25;

    panel.addEventListener('touchstart', start);
    panel.addEventListener('touchmove', move);
    panel.addEventListener('touchend', end);

    panel.addEventListener('mousedown', start);
    panel.addEventListener('mousemove', move);
    panel.addEventListener('mouseup', end);
    panel.addEventListener('mouseleave', end);

    function start(e) {
        dragging = true;
        startY = getY(e);
        panel.style.transition = 'none';

        const match = panel.style.transform.match(/translateY\((.*)%\)/);
        panelStart = match ? parseFloat(match[1]) : CLOSED;
    }

    function move(e) {
        if (!dragging) return;

        currentY = getY(e);
        const dy = currentY - startY;

        let newTranslate = panelStart + (dy / card.offsetHeight) * 100;
        newTranslate = Math.max(OPEN, Math.min(CLOSED, newTranslate));

        panel.style.transform = `translateY(${newTranslate}%)`;
    }

    function end() {
        if (!dragging) return;
        dragging = false;

        panel.style.transition = 'transform 0.25s ease';

        if (currentY < startY) {
            panel.style.transform = `translateY(${OPEN}%)`;
        } else {
            panel.style.transform = `translateY(${CLOSED}%)`;
        }
    }
}
