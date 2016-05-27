import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

class CarouselButton extends BulbsHTMLElement {
  createdCallback () {
    this.innerHTML = this.contentHTML;
  }

  attachedCallback () {
    let carousel = this.closest('bulbs-video-carousel');
    carousel.addEventListener('slide-items', this.checkBounds.bind(this));
  }

  checkBounds (event) {
    if (this.outOfBounds(event.detail)) {
      this.style.opacity = '0.5';
    }
    else {
      this.style.opacity = '';
    }
  }
}

export class NextButton extends CarouselButton {
  get contentHTML () { return '<i class="fa fa-chevron-right">'; }

  outOfBounds (detail) {
    return detail.currentIndex + detail.perPage >= detail.carouselItems.length;
  }
}

export class PreviousButton extends CarouselButton {
  get contentHTML () { return '<i class="fa fa-chevron-left">'; }

  outOfBounds (detail) {
    console.log(detail);
    return detail.currentIndex === 0;
  }
}

registerElement('bulbs-video-carousel-next', NextButton);
registerElement('bulbs-video-carousel-previous', PreviousButton);
