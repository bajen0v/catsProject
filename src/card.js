export class Card {
  _getTemplate() {
    const template = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card");
    return template;
  }

  constructor(data, selectorTemplate, handleClickCatImage, handleCatTitle) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._handleClickCatImage = handleClickCatImage;
    this._handleCatTitle = handleCatTitle;
    
  }

  getElement() {
    this.element = this._getTemplate().cloneNode(true);
    this.cardTitleElement = this.element.querySelector(".card__name");
    this.cardImgElement = this.element.querySelector(".card__image");
    this.cardLikeElement = this.element.querySelector(".card__like");
 
    if (!this._data.favorite) this.cardLikeElement.remove();

    this.cardTitleElement.textContent = this._data.name;
    this.cardImgElement.src = this._data.image;

    this.setEventListener();
    return this.element;
  }

  getData() {
    return this._data;
  }

  getId() {
    return this._data._id;
  }

  setData(newData) {
    this._data = newData;
  }

  deleteView() {
    this.element.remove();
    this.element = null;
  }

  setEventListener() {
    this.cardTitleElement.addEventListener("click",() => this._handleCatTitle(this));
    this.cardImgElement.addEventListener("click", () => this._handleClickCatImage(this._data.image));
  }
}
