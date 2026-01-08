document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.addEventListener('click', function() {
        // Retirer la sélection des autres avatars
        document.querySelectorAll('.avatar').forEach(a => {
            a.classList.remove('selected');
        });
        
        // Ajouter la sélection à l'avatar cliqué
        this.classList.add('selected');
    });
});