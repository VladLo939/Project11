import Api from '../src/api.js'
import CardList from '../src/cardlist.js';
import Card from '../src/card.js';
import Popup from '../src/popup.js';
import ImagePopup from '../src/imagePopup.js';
import UserInfo from '../src/userInfo.js';
import ValidateForm from '../src/validateform.js';

import '../src/pages/index.css';

(function (){
  const placesList = document.querySelector('.places-list');
  const userPopup = document.querySelector('.popup');
  const editPopup = document.querySelector('#edit-popup');
  const editButton = document.querySelector('.user-info__edit-button');
  const popupInfoButton = document.querySelector('.user-info__button'); 
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const zoomedImage = document.querySelector('.image-popup__zoomed')
  const imagePopup = document.querySelector('#image-popup')
  const avatar = document.querySelector('.user-info__photo')

  const userForm = document.forms.new;
  const editForm = document.forms.about;

  const { yourname, job } = editForm.elements;

  const API_URL = NODE_ENV === 'production' ? 'http' : 'https';

  const config = {
    url: `${API_URL}://nomoreparties.co/cohort12`,
    headers: {
      authorization: '543e6a46-79b5-4e39-8baf-9410e5f140a5',
      'Content-Type': 'application/json',
    }
  }



  const popupUser = new Popup(userPopup);
  const popupEdit = new Popup(editPopup);
  const popupImage = new ImagePopup(imagePopup, zoomedImage);
  const setInformation = new UserInfo(userName, userJob, avatar);
  const validationUser = new ValidateForm(userPopup);
  const validationEdit = new ValidateForm(editPopup);
  const api = new Api(config)


  function onFormSubmit() {
   
    setInformation.setUserInfo(yourname.value, job.value);
    api.editUserData(yourname.value, job.value)
    .then((data) => {
      setInformation.updateUserInfo(yourname.value, job.value)
    })
    .catch((err) => {
      console.log(err)
    })


   }


  popupInfoButton.addEventListener('click', function(){
    popupUser.open()
  })




  editButton.addEventListener('click', function(){
    setInformation.showInfo(yourname, job);
    popupEdit.open();
  })



  userForm.addEventListener('submit', function(event){
    event.preventDefault();

    const { name, link } = userForm.elements;
    const card = new Card (name.value, link.value)

    cardList.addCard(card.createCard())
    popupUser.close()
  })

  editForm.addEventListener('submit', function(event){
    event.preventDefault();
    onFormSubmit()

    popupEdit.close()
    
  })

  placesList.addEventListener('click', function(){
    popupImage.openImage()
  })

  userForm.addEventListener('input', function(event){
    validationUser.handlerInputForm(event)
    validationUser.resetErrors
  })

  editForm.addEventListener('input', function(event){
    validationEdit.handlerInputForm(event)
    validationEdit.resetErrors
    
  })

  api.getUserData()
    .then((res) => {
    setInformation.updateFromServer(res)
  })
    .catch((err) => {
      console.log(err)
    })


  api.getCardsData()
    .then((res) => { 
    const initCards = res.map(cardData => {
      console.log(cardData)
      const card = new Card(cardData.name, cardData.link)
      let cardElement = card.createCard();
      card.setEventListener(cardElement);
      return cardElement;
    });
    const serverCardList = new CardList(placesList, initCards)
    serverCardList.render()
  })
    .catch((err) => {
      console.log(err)
    })
 
})()

