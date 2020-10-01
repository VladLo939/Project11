import Popup from './popup'

export default class ImagePopup extends Popup{
    constructor (popup, imageSrc){
        super(popup);
        this.imageSrc = imageSrc;
        
    }

    findLink (){ 
        return this.imageSrc.src = event.target.style.backgroundImage.slice(5, -2)
    }

    
    openImage (){
        if (event.target.classList.contains('place-card__image')){
            this.findLink()
            this.open()
        }
    }
}