import * as auxiliary from './auxiliary/auxiliary';
export default class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;

        this._view.refs.gallery.addEventListener('click', this._model.showModal.bind(this._model));
        this._view.refs.closePopup.addEventListener('click', this._view.closeModal.bind(this._view));
        this._view.refs.modal.addEventListener('click', this._view.closeModal.bind(this._view));
        this._view.refs.favorite.addEventListener('click', this.showFavorite.bind(this));
        this._view.refs.modalBack.addEventListener('click', this.previouse.bind(this));
        this._view.refs.modalNext.addEventListener('click', this.next.bind(this));
        this._view.refs.find.addEventListener('click', this.showFindInput.bind(this));
        this._view.refs.more.addEventListener('click', this.showFind.bind(this));
        this._view.refs.addFavorite.addEventListener('click', this._view.addingFavorite.bind(this._view));
        document.addEventListener('keypress', this.showFindEnter.bind(this));
    }
    showFavorite() {
        this._view.refs.favoriteGallery.classList.toggle('d-none');
        this._view.refs.baseGallery.classList.toggle('d-none');
        this._view.refs.search.classList.toggle('d-none');
        this._view.refs.galleryFavorite.addEventListener('click', this._model.showModal.bind(this));
        if (auxiliary.LOCALSTORAGE.isActive && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
            const arrDoms = localStorage.getItem("doms").split(',');
            const doms = arrDoms.map(e => `<li class="main__item main__item_favorite">${e}<button class="favorite__button">&#10006;</button></li>`);
            this._view.refs.galleryFavorite.innerHTML = doms.reverse().join('');
        }
    }
    showFind(e) {
        e.preventDefault();
        if (!this._view.refs.gallery.hasAttribute('data-category')) {
            this._view.refs.gallery.dataset.category = this._view.refs.input.value;
            this._model.fetchFunction();
        } else if (this._view.refs.gallery.hasAttribute('data-category') && this._view.refs.input.value !== '') {
            this._view.refs.gallery.dataset.category = this._view.refs.input.value;
            this._view.refs.gallery.innerHTML = '';
            this.page = 1;
            this._model.fetchFunction();
        } else {
            this._model.fetchFunction();
        }
    }
    showFindEnter(e) {
        if (e.keyCode === 13) {
            this.showFind(e);
        }
    }
    showFindInput(e) {
        if (this._view.refs.input.value !== '')
        this.showFind(e);
    }
    previouse() {
        if (this._view.refs.baseGallery.classList.contains('d-none')) {
            const allFavorite = Array.from(document.querySelectorAll('.main__img_favorite'));
            const index = allFavorite.map(e => e.src).indexOf(this._view.refs.popupImg.getAttribute('data-small'));
            if (index === 0) {
                this._view.refs.popupImg.src = allFavorite[allFavorite.length - 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allFavorite[allFavorite.length - 1].src;
            } else {
                this._view.refs.popupImg.src = allFavorite[index - 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allFavorite[index - 1].src;
            }
        } else {
            const allMain = Array.from(document.querySelectorAll('.main__img_main'));
            const index = allMain.map(e => e.src).indexOf(this._view.refs.popupImg.getAttribute('data-small'));
            if (index === 0) {
                this._view.refs.popupImg.src = allMain[allMain.length - 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allMain[allMain.length - 1].src;
                this._model.tellingIfInStorage();
            } else {
                this._view.refs.popupImg.src = allMain[index - 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allMain[index - 1].src;
                this._model.tellingIfInStorage();
            }
        }
    }
    next() {
        if (this._view.refs.baseGallery.classList.contains('d-none')) {
            const allFavorite = Array.from(document.querySelectorAll('.main__img_favorite'));
            const index = allFavorite.map(e => e.src).indexOf(this._view.refs.popupImg.getAttribute('data-small'));
            if (index === allFavorite.length - 1) {
                this._view.refs.popupImg.src = allFavorite[0].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allFavorite[0].src;
            } else {
                this._view.refs.popupImg.src = allFavorite[index + 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allFavorite[index + 1].src;
            }
        } else {
            const allMain = Array.from(document.querySelectorAll('.main__img_main'));
            const index = allMain.map(e => e.src).indexOf(this._view.refs.popupImg.getAttribute('data-small'));
            if (index === allMain.length - 1) {
                this._view.refs.popupImg.src = allMain[0].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allMain[0].src;
                this._model.tellingIfInStorage();
            } else {
                this._view.refs.popupImg.src = allMain[index + 1].getAttribute('data-full');
                this._view.refs.popupImg.dataset.small = allMain[index + 1].src;
                this._model.tellingIfInStorage();
            }
        }
    }
}