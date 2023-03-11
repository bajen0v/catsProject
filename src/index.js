import { api } from "./api.js";
import { Card } from "./card.js";
// import { cats } from "./cats.js";
import { Popup } from "./popup.js";
import { PopupWithImage } from "./popup-image.js";
import { CatsInfo } from "./cats-info.js";


const cardsContainer = document.querySelector(".cards");
const btnOpenPopup = document.querySelector("#add");
const btnOpenPopupLogin = document.querySelector("#login");
const formCatAdd = document.querySelector("#popup-form-add");
const formLogin = document.querySelector("#popup-form-login");
const isAuth = Cookies.get("email");
const MAX_LIVE_STORAGE = 10;

const popupAdd = new Popup("popup-add");
popupAdd.setEventListener();

const popupImage = new PopupWithImage("popup-cat-image");
popupImage.setEventListener();

const popupLogin = new Popup("popup-login");
popupLogin.setEventListener();

const popupCatInfo = new Popup("popup-cat-info");
popupCatInfo.setEventListener()

const catsInfoInstance = new CatsInfo('#cats-info-template',handleCatDelete)
const catsInfoElement = catsInfoInstance.getElement()

function serializeForm(elements) {
  const formData = {};

  elements.forEach((input) => {
    if (input.type === "submit" || input.type === "button") return;
    if (input.type === "checkbox") {
      formData[input.name] = input.checked;
    }
    if (input.type !== "checkbox") {
      formData[input.name] = input.value;
    }
  });
  return formData;
}

function createCat(dataCat) {
  const newElement = new Card( dataCat, "#card-template", handleClickCatImage, handleCatTitle);
  cardsContainer.prepend(newElement.getElement());
}

function handleFormAddCat(e) {
  e.preventDefault();
  const elementsFormCat = [...formCatAdd.elements];
  const formData = serializeForm(elementsFormCat);
  api.addNewCat(formData)
    .then(function () {
      createCat(formData)
      updateLocalStorage(formData, {type: 'ADD_CAT'} )
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleFormLogin(e) {
  e.preventDefault();
  const elementsFormLogin = [...formLogin.elements];
  const formData = serializeForm(elementsFormLogin);
  Cookies.set("email", formData.email, { expires: 7 });
  btnOpenPopup.classList.remove("visually-hidden");
  btnOpenPopupLogin.classList.add("visually-hidden");
  popupLogin.close();
  checkLocalStorage();
}

function handleClickCatImage(dataSrc) {
  popupImage.open(dataSrc);
}

function setDataRefresh(minute){
  const setTime = new Date(new Date().getTime() + minute * 60000)
  localStorage.setItem('cats', setTime)
  return setTime
}

function updateLocalStorage(data, action) {
  const oldStorage = JSON.parse(localStorage.getItem('cats'))
  switch(action.type){
    case 'ADD_CAT': 
    oldStorage.push(data)
    localStorage.setItem('cats', JSON.stringify(oldStorage))
    return;
    case 'ALL_CATS': 
    setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh')
    localStorage.setItem('cats', JSON.stringify(data)) 
    return;
    case 'DELETE_CAT': 
    const newStorage = oldStorage.filter(cat => cat.id !== data.id)
    localStorage.setItem('cats', JSON.stringify(newStorage )) 
    return;
    case 'EDIT_CAT': 
    const updateStorage = oldStorage.map(cat => cat.id !== data.id ? cat : data )
    localStorage.setItem('cats', JSON.stringify(updateStorage)) 
    return;
    default : 
    break;
  }
}

function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem("cats"));
  const getTimeExpires = localStorage.getItem('catsRefresh')

  localData && localData.length && new Date() < new Date(getTimeExpires) ? 
      localData.forEach(catData => {
        createCat(catData)
      }) : 
      api.getAllCats()
        .then(data => {
          data.forEach(catData => {
            createCat(catData)
          });
          updateLocalStorage(data, {type: 'ALL_CATS'} )
    });
}

function handleCatTitle(cardInstance){ 
  catsInfoInstance.setData(cardInstance) 
  popupCatInfo.setContent(catsInfoElement)
  popupCatInfo.open()
}

function handleCatDelete(cardInstance) {
  console.log(cardInstance)
  // cardInstance.deleteView()
}
formLogin.addEventListener("submit", handleFormLogin);
formCatAdd.addEventListener("submit", handleFormAddCat);

btnOpenPopup.addEventListener("click", (e) => {
  e.preventDefault();
  popupAdd.open();
});

btnOpenPopupLogin.addEventListener("click", (e) => {
  e.preventDefault();
  popupLogin.open();
});

if (!isAuth) {
  popupLogin.open();
  btnOpenPopup.classList.add("visually-hidden");
} else {
  btnOpenPopupLogin.classList.add("visually-hidden");
  checkLocalStorage();
}




