import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

class BulbsLightBox extends BulbsHTMLElement {

  toggleOverlay() {
    if(this.classList.contains('active')) {
      this.classList.remove('active');
    }
    else if(!this.classList.contains('active')){
      this.classList.add('active');
      if (window.picturefill) {
        window.picturefill();
      }
    }
  }

  attachedCallback () {
    var overlay = this.querySelector('.bulbs-lightbox-overlay');
    this.addEventListener('click', this.toggleOverlay.bind(this));
  }
}

registerElement('bulbs-lightbox', BulbsLightBox);

export default BulbsLightBox;
