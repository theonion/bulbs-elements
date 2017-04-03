import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

import './bulbs-lightbox.scss';

class BulbsLightBox extends BulbsHTMLElement {

  toggleOverlay () {
    if(this.classList.contains('active')) {
      this.classList.remove('active');
    }
    else if(!this.classList.contains('active')) {
      this.classList.add('active');
      if (window.picturefill) {
        window.picturefill();
      }
    }
  }

  attachedCallback () {
    this.addEventListener('click', this.toggleOverlay.bind(this));
  }
}

registerElement('bulbs-lightbox', BulbsLightBox);

export default BulbsLightBox;
