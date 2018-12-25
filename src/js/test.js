export const test = () => {
    const gallery = document.querySelector('.main__gallery_base');
    const galleryFavorite = document.querySelector('.main__gallery_favorite')
    const popup = document.querySelector('.main__popup');
    const closePopup = document.querySelector('.popup__svg_close');
    const popupImg = document.querySelector('.popup__img');
    const favorite = document.querySelector('.header__favourite');
    const favorites = document.querySelector('.header__favourites');
    const baseGallery = document.querySelector('.main__section_base');
    const favoriteGallery = document.querySelector('.main__section_favorite');
    const modalBack = document.querySelector('.popup__svg_back');
    const modalNext = document.querySelector('.popup__svg_next');
    const allFavorite = Array.from(document.querySelectorAll('.main__img_favorite'));
    const allMain = Array.from(document.querySelectorAll('.main__img_main'));
    const find = document.querySelector('.header__button');
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    let flag = 0;

    gallery.addEventListener('click', showModal);
    closePopup.addEventListener('click', closeModal);
    favorite.addEventListener('click', showFavorite);
    modalBack.addEventListener('click', previouse);
    modalNext.addEventListener('click', next);
    find.addEventListener('click', showFind);

    function showModal(e) {
        const target = e.target;
        if (target.nodeName === 'IMG') {
            popupImg.src = target.src;
            popup.classList.remove('d-none');
        } else if (target.nodeName === 'svg') {
            this.removeChild(target.parentNode);
        }
    }

    function closeModal() {
        popup.classList.add('d-none');
    }

    function showFavorite() {
        if (!baseGallery.classList.contains('d-none')) {
            baseGallery.classList.toggle('d-none');
            favoriteGallery.classList.toggle('d-none');
            galleryFavorite.addEventListener('click', showModal);
        }
        else {
            header.classList.remove('header_null');
            favorites.classList.remove('header__favourites_null');
            favoriteGallery.classList.toggle('d-none');
            if(flag === 1) {
                baseGallery.classList.toggle('d-none');
            }
            galleryFavorite.addEventListener('click', showModal);
        }
    }

    function previouse() {
        if (baseGallery.classList.contains('d-none')) {
            const urls = allFavorite.map(e => e.src);
            const index = urls.indexOf(popupImg.src);
            if (index === 0) {
                popupImg.src = urls[urls.length - 1];
            } else {
                popupImg.src = urls[index - 1];
            }
        } else {
            const urls = allMain.map(e => e.src);
            const index = urls.indexOf(popupImg.src);
            if (index === 0) {
                popupImg.src = urls[urls.length - 1];
            } else {
                popupImg.src = urls[index - 1];
            }
        }
    }

    function next() {
        if (baseGallery.classList.contains('d-none')) {
            const urls = allFavorite.map(e => e.src);
            const index = urls.indexOf(popupImg.src);
            if (index === urls.length - 1) {
                popupImg.src = urls[0];
            } else {
                popupImg.src = urls[index + 1];
            }
        } else {
            const urls = allMain.map(e => e.src);
            const index = urls.indexOf(popupImg.src);
            if (index === urls.length - 1) {
                popupImg.src = urls[0];
            } else {
                popupImg.src = urls[index + 1];
            }
        }
    }

    function showFind() {
        if (baseGallery.classList.contains('d-none') && favoriteGallery.classList.contains('d-none')) {
            baseGallery.classList.remove('d-none');
            flag = 1;
            header.classList.remove('header_null');
            favorites.classList.remove('header__favourites_null');
        }
    }
}