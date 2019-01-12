import * as auxiliary from './auxiliary/auxiliary';
export default class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;

        this._view.refs.gallery.addEventListener('click', this._model.showModal.bind(this));
        this._view.refs.closePopup.addEventListener('click', this._view.closeModal.bind(this));
        this._view.refs.favorite.addEventListener('click', this.showFavorite.bind(this));
        this._view.refs.modalBack.addEventListener('click', this._view.previouse.bind(this));
        this._view.refs.modalNext.addEventListener('click', this._view.next.bind(this));
        this._view.refs.find.addEventListener('click', this.showFind.bind(this));
        this._view.refs.more.addEventListener('click', this.showFind.bind(this));
        this._view.refs.addFavorite.addEventListener('click', this._view.addingFavorite.bind(this));
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
        if (!this._view.refs.gallery.hasAttribute('data-category') || this._view.refs.gallery.getAttribute('data-category') == this._view.refs.input.value) {
            if (!this._view.refs.gallery.hasAttribute('data-category')) this._view.refs.gallery.dataset.category = this._view.refs.input.value;
            this._model.fetchFunction();
        } else {
            this._view.refs.gallery.dataset.category = this._view.refs.input.value;
            this._view.refs.gallery.innerHTML = '';
            this.page = 1;
            this._model.fetchFunction();
        }
    }
    showFindEnter (e) {
        if (e.keyCode == 13)
        this.showFind(e);
    }
}