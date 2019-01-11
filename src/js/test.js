export const test = () => {
    const gallery = document.querySelector('.main__gallery_base');
    const galleryFavorite = document.querySelector('.main__gallery_favorite')
    const popup = document.querySelector('.main__popup');
    const closePopup = document.querySelector('.popup__button_close');
    const popupImg = document.querySelector('.popup__img');
    const favorite = document.querySelector('.header__favourite');
    const baseGallery = document.querySelector('.main__section_base');
    const favoriteGallery = document.querySelector('.main__section_favorite');
    const modalBack = document.querySelector('.popup__button_back');
    const modalNext = document.querySelector('.popup__button_next');
    const input = document.querySelector('.search__input');
    const more = document.querySelector('.main__more');
    const addFavorite = document.querySelector('.popup__button_star');
    const search = document.querySelector('.search');

    const find = document.querySelector('.search__button');
    let page;

    gallery.addEventListener('click', showModal);
    closePopup.addEventListener('click', closeModal);
    favorite.addEventListener('click', showFavorite);
    modalBack.addEventListener('click', previouse);
    modalNext.addEventListener('click', next);
    find.addEventListener('click', showFind);
    more.addEventListener('click', showFind);
    addFavorite.addEventListener('click', addingFavorite);

    const LOCALSTORAGE = (w => {
        if (!w) return;

        const isActive = "localStorage" in w;

        const publicAPI = {
            isActive
        };

        return publicAPI;
    })(window);

    function showModal(e) {
        const target = e.target;
        if (target.nodeName === 'IMG') {
            popupImg.src = target.getAttribute('data-full');
            popupImg.dataset.small = target.src;
            if (baseGallery.classList.contains('d-none')) {
                addFavorite.classList.add('popup__button_star-active');
            }
            else {
                tellingIfInStorage();
            }
            popup.classList.remove('d-none');
        } else if (target.nodeName === 'BUTTON') {
            if (LOCALSTORAGE && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
                const storageRemoveDOM = target.parentNode.firstElementChild.outerHTML;
                const innerStorage = localStorage.getItem('doms').split(',');
                localStorage.setItem('doms', `${innerStorage.filter(e => e !== storageRemoveDOM)}`);
            }
            this.removeChild(target.parentNode);
        }
    }

    function closeModal() {
        popup.classList.add('d-none');
        popupImg.src = '';
    }

    function showFavorite() {
        favoriteGallery.classList.toggle('d-none');
        baseGallery.classList.toggle('d-none');
        search.classList.toggle('d-none');
        galleryFavorite.addEventListener('click', showModal);
        if (LOCALSTORAGE && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
            const arrDoms = localStorage.getItem("doms").split(',');
            const doms = arrDoms.map(e => `<li class="main__item main__item_favorite">${e}<button class="favorite__button">&#10006;</button></li>`);
            galleryFavorite.innerHTML = doms.reverse().join('');
        }
    }

    function previouse() {
        if (baseGallery.classList.contains('d-none')) {
            const allFavorite = Array.from(document.querySelectorAll('.main__img_favorite'));
            const index = allFavorite.map(e => e.src).indexOf(popupImg.getAttribute('data-small'));
            if (index === 0) {
                popupImg.src = allFavorite[allFavorite.length - 1].getAttribute('data-full');
                popupImg.dataset.small = allFavorite[allFavorite.length - 1].src;
            } else {
                popupImg.src = allFavorite[index - 1].getAttribute('data-full');
                popupImg.dataset.small = allFavorite[index - 1].src;
            }
        } else {
            const allMain = Array.from(document.querySelectorAll('.main__img_main'));
            const index = allMain.map(e => e.src).indexOf(popupImg.getAttribute('data-small'));
            if (index === 0) {
                popupImg.src = allMain[allMain.length - 1].getAttribute('data-full');
                popupImg.dataset.small = allMain[allMain.length - 1].src;
                tellingIfInStorage();
            } else {
                popupImg.src = allMain[index - 1].getAttribute('data-full');
                popupImg.dataset.small = allMain[index - 1].src;
                tellingIfInStorage();
            }
        }
    }

    function next() {
        if (baseGallery.classList.contains('d-none')) {
            const allFavorite = Array.from(document.querySelectorAll('.main__img_favorite'));
            const index = allFavorite.map(e => e.src).indexOf(popupImg.getAttribute('data-small'));
            if (index === allFavorite.length - 1) {
                popupImg.src = allFavorite[0].getAttribute('data-full');
                popupImg.dataset.small = allFavorite[0].src;
            } else {
                popupImg.src = allFavorite[index + 1].getAttribute('data-full');
                popupImg.dataset.small = allFavorite[index + 1].src;
            }
        } else {
            const allMain = Array.from(document.querySelectorAll('.main__img_main'));
            const index = allMain.map(e => e.src).indexOf(popupImg.getAttribute('data-small'));
            if (index === allMain.length - 1) {
                popupImg.src = allMain[0].getAttribute('data-full');
                popupImg.dataset.small = allMain[0].src;
                tellingIfInStorage();
            } else {
                popupImg.src = allMain[index + 1].getAttribute('data-full');
                popupImg.dataset.small = allMain[index + 1].src;
                tellingIfInStorage();
            }
        }
    }

    function showFind(e) {
        e.preventDefault();
        if (!gallery.hasAttribute('data-category') || gallery.getAttribute('data-category') == input.value) {
            if (!gallery.hasAttribute('data-category')) gallery.dataset.category = input.value;
            fetchFunction();
        } else {
            gallery.dataset.category = input.value;
            gallery.innerHTML = '';
            page = 1;
            fetchFunction();
        }
    }

    function fetchFunction() {
        page == undefined ? page = 1 : page;
        const data = {
            key: '11172718-f6e56b8a08a6b762793b5fef6',
            q: input.value,
            lang: 'ru',
            image_type: 'photo',
            per_page: 12,
            page: `${page}`
        }
        fetch(`https://pixabay.com/api/?key=${data.key}&q=${data.q}&lang=${data.lang}&image_type=${data.image_type}&page=${data.page}&per_page=${data.per_page}`)
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                }
                throw new Error(`Error while fetching: ${res.statusText}`);
            })
            .then(responce => {
                page++;
                createDOM(responce, data);
            });
    }

    function createDOM(responce, data) {
        const lotsLi = [];
        responce.hits.forEach(img => {
            const li = document.createElement('li');
            li.classList.add('main__item');
            const galleryItem = document.createElement('img');
            galleryItem.classList.add('main__img');
            galleryItem.classList.add('main__img_main');
            li.append(galleryItem);
            galleryItem.src = `${img.previewURL}`;
            galleryItem.dataset.full = img.largeImageURL;
            galleryItem.dataset.category = data.q;
            if (img.previewHeight <= img.previewWidth) {
                galleryItem.classList.add('horisontal');
            } else {
                galleryItem.classList.add('vertical');
            }
            lotsLi.push(li);
        });
        gallery.append(...lotsLi);
        if (more.classList.contains('hiden')) more.classList.remove('hiden');
    }

    function addingFavorite() {
        if (favoriteGallery.classList.contains('d-none')) {
            if (LOCALSTORAGE) {
                const allMain = Array.from(document.querySelectorAll('.main__img_main'));
                const domElement = allMain.find(e => e.src == popupImg.getAttribute('data-small'));
                const domElementClone = domElement.cloneNode(false);
                domElementClone.classList.remove('main__img_main');
                domElementClone.classList.add('main__img_favorite');
                if (localStorage.getItem("doms") == null || localStorage.getItem("doms") == '') {
                    localStorage.setItem('doms', `${domElementClone.outerHTML}`);
                    addFavorite.classList.add('popup__button_star-active');
                }
                if (!localStorage.getItem('doms').includes(`${domElementClone.outerHTML}`)) {
                    localStorage.setItem('doms', `${localStorage.getItem("doms")},${domElementClone.outerHTML}`);
                    addFavorite.classList.add('popup__button_star-active');
                }
            }
        }
    }

    function tellingIfInStorage() {
        if (LOCALSTORAGE && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
            const stringDoms = localStorage.getItem("doms");
            if (addFavorite.classList.contains('popup__button_star-active')) {
                addFavorite.classList.remove('popup__button_star-active');
            }
            if (stringDoms.indexOf(popupImg.src) !== -1) {
                addFavorite.classList.add('popup__button_star-active');
            }
        }
    }
}