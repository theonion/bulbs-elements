import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import './carousel-buttons.scss';

export class CarouselButton extends BulbsHTMLElement {
  createdCallback () {
    this.innerHTML = this.contentHTML;
  }

  attachedCallback () {
    let carousel = this.closest('bulbs-carousel');
    carousel.addEventListener('slide-items', this.checkBounds.bind(this), true);
  }

  checkBounds (event) {
    if (this.outOfBounds(event.detail)) {
      this.setAttribute('disabled', '');
    }
    else {
      this.removeAttribute('disabled');
    }
  }
}

export class NextButton extends CarouselButton {
  get contentHTML () { return '<i class="fa fa-chevron-right"></i>'; }

  outOfBounds (detail) {
    return detail.currentIndex + detail.perPage >= detail.carouselItems.length;
  }
}

export class PreviousButton extends CarouselButton {
  get contentHTML () { return '<i class="fa fa-chevron-left"></i>'; }

  outOfBounds (detail) {
    return detail.currentIndex === 0;
  }
}

registerElement('bulbs-carousel-next', NextButton);
registerElement('bulbs-carousel-previous', PreviousButton);
