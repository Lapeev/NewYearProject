import * as auxiliary from './auxiliary/auxiliary';

export default class Model {
    
    constructor(view) {
        this._view = view;
        this.page;
    }

    showModal(e) {
        const target = e.target;
        if (target.nodeName === 'IMG') {
            this._view.refs.popupImg.src = target.getAttribute('data-full');
            this._view.refs.popupImg.dataset.small = target.src;
            if (this._view.refs.baseGallery.classList.contains('d-none')) {
                this._view.refs.addFavorite.classList.add('popup__button_star-active');
            }
            else {
                this.tellingIfInStorage();
            }
            this._view.refs.popup.classList.remove('d-none');
            this._view.refs.body.style.overflowY = 'hidden';
        } else if (target.nodeName === 'BUTTON') {
            if (auxiliary.LOCALSTORAGE.isActive && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
                const storageRemoveDOM = target.parentNode.firstElementChild.outerHTML;
                const innerStorage = localStorage.getItem('doms').split(',');
                localStorage.setItem('doms', `${innerStorage.filter(e => e !== storageRemoveDOM)}`);
            }
            target.parentNode.outerHTML = '';
        }
    }
    fetchFunction() {
        this.page == undefined ? this.page = 1 : this.page;
        const data = {
            key: '11172718-f6e56b8a08a6b762793b5fef6',
            q: this._view.refs.input.value,
            lang: 'ru',
            image_type: 'photo',
            per_page: 12,
            page: this.page
        }
        fetch(`https://pixabay.com/api/?key=${data.key}&q=${data.q}&lang=${data.lang}&image_type=${data.image_type}&page=${data.page}&per_page=${data.per_page}`)
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                }
                throw new Error(`Error while fetching: ${res.statusText}`);
            })
            .then(responce => {                
                this.page++;
                this._view.createDOM(responce, data);                
            });
    }
    tellingIfInStorage() {
        if (auxiliary.LOCALSTORAGE.isActive && localStorage.getItem("doms") !== null && localStorage.getItem("doms") !== '') {
            const stringDoms = localStorage.getItem("doms");
            if (this._view.refs.addFavorite.classList.contains('popup__button_star-active')) {
                this._view.refs.addFavorite.classList.remove('popup__button_star-active');
            }
            if (stringDoms.indexOf(this._view.refs.popupImg.src) !== -1) {
                this._view.refs.addFavorite.classList.add('popup__button_star-active');
            }
        }
    }
}