const avatarChoisi = localStorage.getItem('avatar');
const avatarImg = document.getElementById('avatar-selected');

if (avatarChoisi && avatarImg) {
    avatarImg.src = `../assets/images/${avatarChoisi}.png`;
}

const baseProfiles = [
    { id: 1, name: "Luca Giordano", type: "Coup d'un soir", ville: "Naples", age: "391 ans", tag1: "Cosplay de peintres", tag2: "Pasta", tag3: "Marathonien", tag4: "Café" ,image: "../assets/images/card/luca_giordano_card.png", infoText: "Je suis tellement rapide pour peindre que mes contemporains me surnomment « Luca Fa Presto », ce qui signifie en italien « Luca, il fait vite »", infoImage: "../assets/images/card/description-luca.png", matchable: true, redflag1: "2 de tension", redflag2: "Ponctuel(le)", greenflag1: "En avance", greenflag2: "Flash Mcqueen" },
    { id: 2, name: "Dirck Van Baburen", type: "Coup d'un soir", ville: "Naples", age: "430 ans", tag1: "Brasserie", tag2: "Malt de blé", tag3: "Fêtes", tag4: "Amusement" ,image: "../assets/images/card/van_baburen_card.png", infoText: "Je suis amoureux des fêtes bien remplies et surtout de la bière. Il me faut quelqu’un pour me raccompagner chez moi. On me surnomme “mouche à bière.”", infoImage: "../assets/images/card/description-dirck.png", matchable:  true, redflag1: "Bordélique", redflag2: "Introverti(e)", greenflag1: "Bon délire", greenflag2: "Hydraté(e)" },
    { id: 3, name: "Bartolomé Esteban", type: "Relation court terme", ville: "Séville", age: "408 ans", tag1: "Femmes", tag2: "Peintures", tag3: "Enfants", tag4: "Animaux empaillés" ,image: "../assets/images/card/bartolome_esteban_card.png", infoText: "J’admire le corps des femmes et j’aime particulièrement les peindre. Je veux des enfants pour les peindre et j’en ai déjà 10.", infoImage: "../assets/images/card/description-dirck.png",  matchable:  true, redflag1: "Érotomane", redflag2: "Peinture de nu", greenflag1: "Nymphomane", greenflag2: "BDSM" },
    { id: 4, name: "Trophime Bigot", type: "Coup d'un soir", ville: "Arles", age: "446 ans", tag1: "Bougies", tag2: "Nuit", tag3: "Intimité", tag4: "Ombres chinoises" ,image: "../assets/images/card/trophime_bigot_card.png", infoText: "J’aime les ambiances intimistes, les soirées à la bougie et les visages qui émergent de l’ombre. On m’a longtemps pris pour quelqu’un d’autre, mais aujourd’hui je sais exactement qui je suis.", infoImage: "../assets/images/card/description-dirck.png", matchable: true, redflag1: "Narcoleptique", redflag2: "Peur du feu", greenflag1: "Pyromane", greenflag2: "Insomniaque" },
    { id: 5, name: "Pedro de Moya", type: "Relation long terme", ville: "Séville", age: "408 ans", tag1: "Voyage", tag2: "Religion", tag3: "Amour", tag4: "Vie" ,image: "../assets/images/card/pedro_de_mayo_card.png", infoText: "Si tu veux voyager, que ce soit à l’extérieur ou à l’intérieur, je suis ton âme sœur. Je saurai te faire voyager là où tu découvriras les pépites les plus inattendues.", infoImage: "../assets/images/card/description-dirck.png", matchable: true, redflag1: "Indécis(e)", redflag2: "Sédentaire", greenflag1: "Baroudeur(se)", greenflag2: "Attentionné(e)" },
    { id: 6, name: "Jean Durand", type: "Relation long terme", ville: "Lyon", age: "22 ans", tag1: "Les beaux-arts", tag2: "Gen Z", tag3: "PasDeBuzz", tag4: "Old Money" ,image: "../assets/images/card/jean_durand_card.png", infoText: "Je n’ai pas de buzz et j’essaie de percer pour vivre de mon art. Je passe plus de temps à rêver de followers qu’à en avoir.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "0 Buzz", redflag2: "Introvertie", greenflag1: "Dopamine rapide", greenflag2: "Influenceur" },
    { id: 7, name: "Aïssa Koabil", type: "Relation court terme", ville: "Dakar", age: "52 ans", tag1: "Inachevé", tag2: "Éparpillé", tag3: "_", tag4: "Vision" ,image: "../assets/images/card/aissa_koabil_card.png", infoText: "Je commence toujours plein de tableaux et je n’en termine jamais aucun. Je passe plus de temps à imaginer ce que je pourrais faire qu’à finir ce que j’ai commencée.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "Energie temporaire", redflag2: "Distrait", greenflag1: "Déphasé", greenflag2: "Procrastinateur" },
    { id: 8, name: "Mathieu Zylow", type: "Relation court terme", ville: "Brest", age: "27 ans", tag1: "Musique", tag2: "Aquarelle", tag3: "Guitare", tag4: "Mode" , image: "../assets/images/card/mathieu_zylow.png", infoText: "Guitare jamais loin, playlist toujours prête. Toujours minutieux sur le choix de mes vestes, mes peinture et le choix de mes accord (et encore plus pour la femme que j’aime). Si t’aimes la musique, et les discussions un peu profondes à 2h du mat, on devrait s’entendre.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "Envahissant(e)", redflag2: "Rap", greenflag1: "Créatif", greenflag2: "À l’écoute" },
    { id: 9, name: "Dan Antonio", type: "Relation long terme", ville: "Mexico", age: "39 ans", tag1: "Cuisine", tag2: "Écriture", tag3: "Randonnée", tag4: "Café" ,image: "../assets/images/card/antonio_card.png", infoText: "Mexicain, calme en apparence, intense quand il faut. J’aime les choses simples bien faites : un bon repas, une discussion honnête, et un plan qui ne cherche pas à impressionner. Pas là pour jouer un rôle, juste pour rencontrer quelqu’un de vrai.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "Têtu(e)", redflag2: "Drama", greenflag1: "Authenticité", greenflag2: "Communication" },
    { id: 10, name: "Vanessa Herbault", type: "Coup d'un soir", ville: "Cenon", age: "26 ans", tag1: "Brunchs", tag2: "Voyages", tag3: "Esthétique", tag4: "Art" ,image: "../assets/images/card/vanessa_card.png", infoText: "Je sais ce que je veux et ce que je ne veux pas. J’aime le confort, l’élégance et les hommes qui savent prendre les choses en main. Les relations simples ne m’intéressent pas, je préfère quelqu’un d’ambitieux, généreux et sûr de lui.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "50/50", redflag2: "Simple", greenflag1: "Aisé(e)", greenflag2: "Vespa" },
    { id: 11, name: "Grug Bort", type: "Relation long terme", ville: "Alger", age: "24 215 ans", tag1: "Viande", tag2: "Cueillette", tag3: "Chasse", tag4: "Mammouths" ,image: "../assets/images/card/grug_bort_card.png", infoText: "J’aime courir après les mammouths le samedi matin avec mes amis. J’aime mon steak bien cuit avec quelques baies des forêts. J’aime courir, sauter, ramper. Toujours à la recherche de nouvelles aventures.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "Végétarien(ne)", redflag2: "Méchant(e)", greenflag1: "Pyromane", greenflag2: "Chasseur(euse)" },
    { id: 12, name: "Chloé Durmont", type: "Relation long terme", ville: "Nîmes", age: "22 ans", tag1: "Animation", tag2: "Musique", tag3: "Sculpture", tag4: "Asie" ,image: "../assets/images/card/chloe_card.png", infoText: "Je suis une artiste, et j’ai besoin d’un ou ... une muse pour inspirer mes créations. Je suis pleine de couleurs et de bonne humeurs. Avec moi tu n’auras jamais le syndrome de la feuille blanche.", infoImage: "../assets/images/card/chloe_card.png", matchable: false, redflag1: "Naïf", redflag2: "Molasson", greenflag1: "Attentioné(e)", greenflag2: "Empathique" },
    { id: 13, name: "Léonie Laval", type: "Relation long terme", ville: "Carrefour", age: "23 ans", tag1: "CDI", tag2: "Malt de blé", tag3: "Fêtes", tag4: "Amusement" ,image: "../assets/images/card/leonie_card.png", infoText: "Je suis Léonie, spontanée, souriante et toujours moi-même. J’aime partager des moments simples, mettre de la bonne humeur autour de moi et montrer que l’authenticité peut aussi faire sourire.", infoImage: "../assets/images/card/leonie_card.png", matchable: false, redflag1: "Lidl", redflag2: "Lidl", greenflag1: "Mise en rayon", greenflag2: "Fidèle" },
    { id: 14, name: "Pidi à Walouz", type: "Relation long terme", ville: "Paris", age: "25 ans", tag1: "Boutiques", tag2: "Restaurants", tag3: "Shatta", tag4: "Voyage" ,image: "../assets/images/card/pidi_card.png", infoText: "Je suis cherche une personne pour découvrir le monde, passer de bons moments. J’ai besoin de me mettre au sport donc si tu peux m’aider ça pourrait être bien ;)", infoImage: "../assets/images/card/pidi_card.png", matchable: false, redflag1: "Timide", redflag2: "Mou", greenflag1: "Entreprenant", greenflag2: "Sportif" },
    { id: 15, name: "Tom", type: "Coup d'un soir", ville: "Naples", age: "430 ans", tag1: "Brasserie", tag2: "Malt de blé", tag3: "Fêtes", tag4: "Amusement" ,image: "../assets/images/card/mathieu_zylow.png", infoText: "Je n’ai pas de buzz et j’essaie de percer pour vivre de mon art. Je passe plus de temps à rêver de followers qu’à en avoir.", infoImage: "../assets/images/card/description-dirck.png", matchable: false, redflag1: "Pas de buzz", redflag2: "Artiste en galère", greenflag1: "Sympa", greenflag2: "Drôle" },
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
        <div class="infos">
            <div class="title-row">
                <h2>${data.name}</h2>
                <span class="type">${data.type}</span>
            </div>
            <div class="location-row">
                <img src="../assets/images/location-icon.svg" alt="Location Icon" class="location-icon">
                <span class="location-text">${data.ville}</span>
                <img src="../assets/images/age-icon.svg" alt="Age Icon" class="age-icon">
                <span class="age-text">${data.age}</span>
            </div>
            <div class="tags-row1">
                <span class="tag">${data.tag1}</span>
                <span class="tag">${data.tag2}</span>
            </div>
            <div class="tags-row2">
                <span class="tag">${data.tag3}</span>
                <span class="tag">${data.tag4}</span>
            </div>
        </div>
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
            <div class="description">
                <h2>Description</h2>
            </div>
            <div class="description-text">
                <p>${data.infoText}</p>
            </div>
            <div class="red-flag-title">
                <img src="../assets/images/red-flag-icon.svg" alt="Red Flag Icon" class="red-flag-icon">
                <h3>RED FLAGS</h3>
            </div>
            <div class="red-flag-row">
                <span class="red-flag-tag">${data.redflag1}</span>
                <span class="red-flag-tag">${data.redflag2}</span>
            </div>
            <div class="green-flag-title">
                <img src="../assets/images/green-flag-icon.svg" alt="Green Flag Icon" class="green-flag-icon">
                <h3>GREEN FLAGS</h3>
            </div>
            <div class="green-flag-row">
                <span class="green-flag-tag">${data.greenflag1}</span>
                <span class="green-flag-tag">${data.greenflag2}</span>
            </div>
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
    // Stocker l'index du profil dans la carte pour pouvoir l'identifier lors du swipe
    card.dataset.profileIndex = currentIndex;
    cardStack.appendChild(card);
    currentIndex++;
}

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
        // Passer la carte pour identifier le bon profil
        checkMatch(card);
    }
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = `translateX(${moveX}vw) rotate(${moveX / 6}deg)`;
    setTimeout(() => {
        card.remove();
        loadNextCard();
    }, 300);
}

function checkMatch(card) {
    // Utiliser l'index stocké dans la carte pour obtenir le bon profil
    const profileIndex = parseInt(card.dataset.profileIndex);
    const profile = cardsData[profileIndex];
    if (!profile || !profile.matchable) {
        if (profile) {
            console.log(`❌ ${profile.name} → hors salle`);
        }
        return;
    }
    showMatch(profile);
}

function showMatch(profile) {
    console.log(`💖 MATCH avec ${profile.name}`);
    // Sauvegarder l'ID du profil matché pour l'utiliser dans match.html
    localStorage.setItem('matchedProfileId', profile.id);
    localStorage.setItem('matchedProfileName', profile.name);
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
    const OPEN = 30.90;
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
