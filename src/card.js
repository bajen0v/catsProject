export class Card {
  _getTemplate() {
    const template = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card");
    return template;
  }

  constructor(data, selectorTemplate, handleClickCatImage, handleCatTitle, handleLikeCat) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._handleClickCatImage = handleClickCatImage;
    this._handleCatTitle = handleCatTitle;
    this._handleLikeCat  = handleLikeCat;
    
  }

  _updateViewLike(){
    if(this._data.favorite) {
      this.cardLikeElement.classList.add('card__like_active');
    } else {
      this.cardLikeElement.classList.remove('card__like_active');
    }
  }

  _setLikeCat = () => {
    this._data.favorite = !this._data.favorite;
    this.updateView();

    this._handleLikeCat(this._data, this);
  }

  getElement() {
    this.element = this._getTemplate().cloneNode(true);
    this.cardTitleElement = this.element.querySelector(".card__name");
    this.cardImgElement = this.element.querySelector(".card__image");
    this.cardLikeElement = this.element.querySelector(".card__like");
    
    this.updateView();
    this.setEventListener();
    return this.element;
  }

  getData() {
    return this._data;
  }

  getId() {
    return this._data.id;
  }

  setData(newData) {
    this._data = newData;
  }

  updateView(){
    this.cardTitleElement.textContent = this._data.name;
    this.cardImgElement.src = this._data.image;

    this._updateViewLike()
  }

  deleteView() {
    this.element.remove();
    this.element = null;
  }

  setEventListener() {
    this.cardTitleElement.addEventListener("click",() => this._handleCatTitle(this));
    this.cardImgElement.addEventListener("click", () => this._handleClickCatImage(this._data.image));
    this.cardLikeElement.addEventListener("click", this._setLikeCat);
  }
}
