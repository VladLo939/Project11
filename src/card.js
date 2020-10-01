export default class Card{
   
    constructor(name, link){
      this.name = name;
      this.link = link;
    }
    createCard(){
     
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');
    
      const cardImage = document.createElement('div');
      cardImage.classList.add('place-card__image');
      cardImage.style.backgroundImage = `url(${this.link})`;
    
      const delButton = document.createElement('button');
      delButton.classList.add('place-card__delete-icon');
    
      const cardDescript = document.createElement('div');
      cardDescript.classList.add('place-card__description');
    
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = this.name
    
      const likeButton = document.createElement('button');
      likeButton.classList.add('place-card__like-icon');
    
      placeCard.appendChild(cardImage);
      cardImage.appendChild(delButton);
      cardDescript.appendChild(cardName);
      cardDescript.appendChild(likeButton);
      placeCard.appendChild(cardDescript);
    
      this.cardElement = placeCard;
      this.setEventListener()
      return placeCard
    }
  
    setEventListener() {
      this
        .cardElement
        .querySelector(".place-card__like-icon")
        .addEventListener("click", this.like);
  
      this
        .cardElement
        .querySelector(".place-card__delete-icon")
        .addEventListener("click", this.remove);
    }

    openImage = () => { 
      this.openImageCallback(this.link)
      console.log(this.link)
  }
  
    like = () => {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  
    remove = () => {
      this.cardElement.remove();
      this.deleteEventListener();
    }
  

    deleteEventListener(){
      this
        .cardElement
        .querySelector(".place-card__like-icon")
        .removeEventListener("click", this.like);

        this
        .cardElement
        .querySelector(".place-card__like-icon")
        .removeEventListener("click", this.remove);
    }
  }