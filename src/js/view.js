import * as auxiliary from './auxiliary/auxiliary';
export default class View {
    constructor() {
        this.refs = {};

        this.refs.gallery = document.querySelector('.main__gallery_base');
        this.refs.galleryFavorite = document.querySelector('.main__gallery_favorite')
        this.refs.popup = document.querySelector('.main__popup');
        this.refs.closePopup = document.querySelector('.popup__button_close');
        this.refs.popupImg = document.querySelector('.popup__img');
        this.refs.favorite = document.querySelector('.header__favourite');
        this.refs.baseGallery = document.querySelector('.main__section_base');
        this.refs.favoriteGallery = document.querySelector('.main__section_favorite');
        this.refs.modalBack = document.querySelector('.popup__button_back');
        this.refs.modalNext = document.querySelector('.popup__button_next');
        this.refs.input = document.querySelector('.search__input');
        this.refs.more = document.querySelector('.main__more');
        this.refs.addFavorite = document.querySelector('.popup__button_star');
        this.refs.search = document.querySelector('.search');
        this.refs.find = document.querySelector('.search__button');
        this.refs.body = document.querySelector('body');
        this.refs.modal = document.querySelector('.popup__blur');
    }

    closeModal(e) {
        if (e.target.classList.contains('popup__blur') || e.target.classList.contains('popup__button_close')) {
            this.refs.popup.classList.add('d-none');
            this.refs.popupImg.src = '';
            this.refs.body.style.overflowY = 'initial';
        }
    }
    createDOM(responce, data) {
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
        this.refs.gallery.append(...lotsLi);
        if (this.refs.more.classList.contains('hiden')) this.refs.more.classList.remove('hiden');
    }
    addingFavorite() {
        if (this.refs.favoriteGallery.classList.contains('d-none')) {
            if (auxiliary.LOCALSTORAGE.isActive) {
                const allMain = Array.from(document.querySelectorAll('.main__img_main'));
                const domElement = allMain.find(e => e.src == this.refs.popupImg.getAttribute('data-small'));
                const domElementClone = domElement.cloneNode(false);
                domElementClone.classList.remove('main__img_main');
                domElementClone.classList.add('main__img_favorite');
                if (localStorage.getItem("doms") == null || localStorage.getItem("doms") == '') {
                    localStorage.setItem('doms', `${domElementClone.outerHTML}`);
                    this.refs.addFavorite.classList.add('popup__button_star-active');
                }
                if (!localStorage.getItem('doms').includes(`${domElementClone.outerHTML}`)) {
                    localStorage.setItem('doms', `${localStorage.getItem("doms")},${domElementClone.outerHTML}`);
                    this.refs.addFavorite.classList.add('popup__button_star-active');
                }
            }
        }
    }
}