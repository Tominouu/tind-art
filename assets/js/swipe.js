const avatarChoisi = localStorage.getItem('avatar');
const avatarImg = document.getElementById('avatar-selected');

if (avatarChoisi && avatarImg) {
    avatarImg.src = `../assets/images/${avatarChoisi}.jpg`;
}

const baseProfiles = [
    { id: 1, name: "Luca", image: "../assets/images/luca.png", infoImage: "../assets/images/description-luca.png", matchable: true },
    { id: 2, name: "Dirck", image: "../assets/images/dirck.png", infoImage: "../assets/images/description-dirck.png", matchable: true },
    { id: 3, name: "Art mystère", image: "../assets/images/card.svg", infoImage: "../assets/images/description-dirck.png", matchable: true },
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

    const shuffledNonMatchables = shuffle(nonMatchables);

    cardsData = [
        ...shuffledNonMatchables.slice(0, 2),
        ...shuffle([...shuffledNonMatchables.slice(2), ...matchables])
    ];

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
            <button class="choice-btn nope"><img src="../assets/images/next.svg"></button>
            <button class="choice-btn like"><img src="../assets/images/like.svg"></button>
        </div>

        <div class="card-info">
            <img src="${data.infoImage}">
        </div>
    `;

    card.querySelector('.like').onclick = () => swipe(card, 'right');
    card.querySelector('.nope').onclick = () => swipe(card, 'left');

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

function addSwipe(card) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    const threshold = 100;

    card.addEventListener('mousedown', start);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseup', end);
    card.addEventListener('mouseleave', end);

    card.addEventListener('touchstart', start);
    card.addEventListener('touchmove', move);
    card.addEventListener('touchend', end);

    function start(e) {
        if (e.target.closest('.card-info') || e.target.closest('button')) return;
        dragging = true;
        startX = getX(e);
        card.style.transition = 'none';
    }

    function move(e) {
        if (!dragging) return;

        const dx = getX(e) - startX;
        currentX = dx;

        card.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;

        const infoPanel = card.querySelector('.card-info');
        if (infoPanel) {
            const absDx = Math.abs(dx);

            if (absDx < 30) {
                infoPanel.style.transform = 'translateY(90%)';
                infoPanel.style.opacity = '1';
                return;
            }
            const progress = Math.min((absDx - 30) / (threshold * 2), 1);
            const eased = Math.pow(progress, 2.5);

            infoPanel.style.transform = `translateY(${90 + eased * 10}%)`; 
            infoPanel.style.opacity = '1';
        }
    }

    function end() {
        dragging = false;

        if (Math.abs(currentX) > threshold) {
            swipe(card, currentX > 0 ? 'right' : 'left');
        } else {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateX(0)';

            const infoPanel = card.querySelector('.card-info');
            if (infoPanel) {
                infoPanel.style.transition = 'transform 0.3s ease';
                infoPanel.style.transform = 'translateY(90%)';
                infoPanel.style.opacity = '1';
            }
        }
    }
}

function swipe(card, direction) {
    const infoPanel = card.querySelector('.card-info');

    if (infoPanel) {
        infoPanel.style.transition = 'transform 0.4s ease, opacity 0.3s ease';
        infoPanel.style.transform = 'translateY(120%)';
        infoPanel.style.opacity = '0';
    }

    setTimeout(() => {
        card.style.transition = 'transform 0.35s ease';
        card.style.transform = `translateX(${direction === 'right' ? 120 : -120}vw)`;
    }, 120);

    setTimeout(() => {
        card.remove();
        loadNextCard();
    }, 600);
}

function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function getY(e) {
    return e.touches ? e.touches[0].clientY : e.clientY;
}

function addInfoPanelDrag(card) {
    const panel = card.querySelector('.card-info');
    let startY = 0;
    let startPos = 90;
    let dragging = false;

    panel.addEventListener('mousedown', start);
    panel.addEventListener('mousemove', move);
    panel.addEventListener('mouseup', end);
    panel.addEventListener('mouseleave', end);

    panel.addEventListener('touchstart', start);
    panel.addEventListener('touchmove', move);
    panel.addEventListener('touchend', end);

    function start(e) {
        dragging = true;
        startY = getY(e);
        panel.style.transition = 'none';
    }

    function move(e) {
        if (!dragging) return;
        const dy = getY(e) - startY;
        const newY = Math.min(90, Math.max(25, startPos + dy / 5));
        panel.style.transform = `translateY(${newY}%)`;
    }

    function end() {
        dragging = false;
        panel.style.transition = 'transform 0.3s ease';
        panel.style.transform = 'translateY(90%)';
    }
}
