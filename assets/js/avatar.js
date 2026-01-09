const avatars = document.querySelectorAll('.avatar');

const avatarSauvegarde = localStorage.getItem('avatar');

avatars.forEach(avatar => {

    if (avatar.dataset.avatar === avatarSauvegarde) {
        avatar.classList.add('selected');
    }

    avatar.addEventListener('click', () => {

        avatars.forEach(a => a.classList.remove('selected'));

        avatar.classList.add('selected');

        localStorage.setItem('avatar', avatar.dataset.avatar);
    });
});
