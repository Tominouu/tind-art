// Gestion de l'accès à la caméra et capture de photo

let stream = null;
let video = null;
let canvas = null;
let photoData = null;

// Fonction pour demander l'accès à la caméra
async function accederCamera() {
    try {
        // Demander la permission d'accès à la caméra
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user' // Caméra frontale
            } 
        });
        
        // Si la permission est accordée, afficher le flux vidéo
        video = document.getElementById('video');
        if (video) {
            video.srcObject = stream;
            video.play();
            
            // Afficher les contrôles de capture
            document.getElementById('camera-controls').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
        }
    } catch (error) {
        // Gérer les erreurs (permission refusée, caméra indisponible, etc.)
        console.error('Erreur d\'accès à la caméra:', error);
        afficherErreur();
    }
}

// Fonction pour afficher un message d'erreur
function afficherErreur() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Impossible d\'accéder à la caméra. Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.';
    }
    
    // Masquer les contrôles
    const cameraControls = document.getElementById('camera-controls');
    if (cameraControls) {
        cameraControls.style.display = 'none';
    }
}

// Fonction pour capturer la photo
function capturerPhoto() {
    if (!video || !stream) {
        return;
    }
    
    // Créer un canvas pour capturer l'image
    canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convertir en base64
    photoData = canvas.toDataURL('image/png');
    
    // Arrêter le flux vidéo
    arreterCamera();
    
    // Sauvegarder la photo dans localStorage pour l'afficher dans end.html
    localStorage.setItem('photoCapturee', photoData);
    
    // Rediriger vers end.html
    window.location.href = 'end.html';
}

// Fonction pour arrêter la caméra
function arreterCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    
    if (video) {
        video.srcObject = null;
    }
}

// Nettoyer lors du changement de page
window.addEventListener('beforeunload', () => {
    arreterCamera();
});

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const accederButton = document.getElementById('acceder-camera-btn');
    if (accederButton) {
        accederButton.addEventListener('click', accederCamera);
    }
    
    const capturerButton = document.getElementById('capturer-btn');
    if (capturerButton) {
        capturerButton.addEventListener('click', capturerPhoto);
    }
    
    const annulerButton = document.getElementById('annuler-btn');
    if (annulerButton) {
        annulerButton.addEventListener('click', () => {
            arreterCamera();
            // Masquer les contrôles et réafficher le bouton initial
            document.getElementById('camera-controls').style.display = 'none';
            document.getElementById('error-message').style.display = 'none';
        });
    }
});
