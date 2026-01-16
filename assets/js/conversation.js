let conversationData = {
    currentStep: 0,
    lastSender: null,
    responses: []
};

const discussionEl = document.querySelector('.discussion');
const chooseContainer = document.querySelector('.choose-container');

function getContactNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('contact') || 'Paul Cezanne';
}

async function loadConversation() {
    try {
        const response = await fetch('/assets/data/conversations.json');
        const data = await response.json();
        const contactName = getContactNameFromURL();
        const conversation = data.conversations.find(c => c.contactName === contactName);
        if (conversation) {
            conversationData.responses = conversation.steps;
            updateHeader(conversation);
            if (conversation.firstMessage) {
                addMessage(conversation.firstMessage, true);
                updateLastBubble();
            }
        } else {
            console.error('Conversation non trouvée pour:', contactName);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des conversations:', error);
    }
}

function updateHeader(conversation) {
    const avatarImg = document.querySelector('.avatar-conversation');
    const nameH3 = document.querySelector('.title-container-conversation h3');
    if (avatarImg) avatarImg.src = conversation.avatar;
    if (avatarImg) avatarImg.alt = conversation.contactName;
    if (nameH3) nameH3.textContent = conversation.contactName;
}

function addMessage(text, isSender) {
    const bubbles = discussionEl.querySelectorAll('.bubble');
    const lastBubble = bubbles[bubbles.length - 1];
    const isSameSender = lastBubble && lastBubble.classList.contains(isSender ? 'sender' : 'recipient');
    if (lastBubble) {
        if (isSameSender) {
            lastBubble.classList.remove('first', 'last');
            lastBubble.classList.add('middle');
        } else {
            lastBubble.classList.remove('first', 'middle');
            lastBubble.classList.add('last');
        }
    }
    const bubble = document.createElement('div');
    const position = isSameSender ? 'middle' : 'first';
    bubble.className = `bubble ${isSender ? 'sender' : 'recipient'} ${position}`;
    bubble.textContent = text;
    discussionEl.appendChild(bubble);
    discussionEl.scrollTop = discussionEl.scrollHeight;
    conversationData.lastSender = isSender;
}

function updateLastBubble() {
    const bubbles = discussionEl.querySelectorAll('.bubble');
    if (bubbles.length > 0) {
        const lastBubble = bubbles[bubbles.length - 1];
        lastBubble.classList.remove('first', 'middle');
        lastBubble.classList.add('last');
    }
}

function updateOptions() {
    // Vérifier si on a terminé les 3 échanges (3 messages bot + 3 messages utilisateur)
    // Le premier message est déjà affiché, donc on compte les steps complétés
    if (conversationData.currentStep >= conversationData.responses.length) {
        chooseContainer.innerHTML = '';
        updateLastBubble();
        // Navigation automatique vers date.html à la fin de la conversation
        const contactName = getContactNameFromURL();
        setTimeout(() => {
            window.location.href = `date.html?contact=${encodeURIComponent(contactName)}`;
        }, 1000); // Délai de 1 seconde avant la redirection
        return;
    }
    const current = conversationData.responses[conversationData.currentStep];
    chooseContainer.innerHTML = current.userOptions.map((option, index) =>
        `<div class="choose-conversation" data-index="${index}">
            <h3 style="color: white">${option}</h3>
        </div>`
    ).join('');
    document.querySelectorAll('.choose-conversation').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });
}

function showWaitingMessage() {
    const current = conversationData.responses[conversationData.currentStep];
    chooseContainer.innerHTML = current.userOptions.map(() =>
        `<div class="choose-conversation"><h3 style="color: white">En attente de réponse</h3></div>`
    ).join('');
}

function removeTypingBubble() {
    const typingBubble = discussionEl.querySelector('.typing-indicator');
    if (typingBubble) {
        typingBubble.remove();
    }
}

function showTypingBubble() {
    const bubbles = discussionEl.querySelectorAll('.bubble');
    const lastBubble = bubbles[bubbles.length - 1];
    const isSameSender = lastBubble && lastBubble.classList.contains('sender');
    if (lastBubble && isSameSender) {
        lastBubble.classList.remove('first', 'last');
        lastBubble.classList.add('middle');
    } else if (lastBubble) {
        lastBubble.classList.remove('first', 'middle');
        lastBubble.classList.add('last');
    }
    const typingBubble = document.createElement('div');
    typingBubble.className = `bubble sender ${isSameSender ? 'middle' : 'first'} typing-indicator`;
    typingBubble.textContent = '...';
    discussionEl.appendChild(typingBubble);
    discussionEl.scrollTop = discussionEl.scrollHeight;
}

function handleOptionClick(e) {
    const index = parseInt(e.currentTarget.dataset.index); // 0 ou 1 selon l'option choisie
    const current = conversationData.responses[conversationData.currentStep];
    
    // Afficher le message de l'utilisateur (userOptions[0] ou userOptions[1])
    addMessage(current.userOptions[index], false);
    updateLastBubble();
    
    const isLastExchange = conversationData.currentStep === conversationData.responses.length - 1;
    
    // Si dernière échange et option 1 (négative), rediriger vers swipe.html
    if (isLastExchange && index === 1) {
        chooseContainer.innerHTML = '';
        setTimeout(() => {
            window.location.href = 'swipe.html';
        }, 500);
        return;
    }
    
    // Fonction pour obtenir et afficher la réponse du bot
    const getAndShowBotResponse = () => {
        // Si userOptions[0] (index 0) → botResponses["0"]
        // Si userOptions[1] (index 1) → botResponses["1"]
        const responseKey = index.toString(); // "0" ou "1"
        const botResponses = current.botResponses[responseKey];
        
        if (!botResponses || botResponses.length === 0) {
            console.error(`Aucune réponse trouvée pour l'index ${index} (clé "${responseKey}")`);
            return;
        }
        
        const randomBotResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomBotResponse, true);
        updateLastBubble();
    };
    
    if (isLastExchange) {
        chooseContainer.innerHTML = '';
        showWaitingMessage();
        showTypingBubble();
        const delay = Math.floor(Math.random() * 2000) + 2000;
        setTimeout(() => {
            removeTypingBubble();
            getAndShowBotResponse();
            const contactName = getContactNameFromURL();
            setTimeout(() => {
                window.location.href = `date.html?contact=${encodeURIComponent(contactName)}`;
            }, 1000);
        }, delay);
        return;
    }
    
    showWaitingMessage();
    showTypingBubble();
    const delay = Math.floor(Math.random() * 2000) + 2000;
    setTimeout(() => {
        removeTypingBubble();
        getAndShowBotResponse();
        conversationData.currentStep++;
        updateOptions();
    }, delay);
}

loadConversation().then(() => {
    updateOptions();
});
