import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

import './carousel-slider.scss';

export default class CarouselSlider extends BulbsHTMLElement {
  get gridRatio () {
    if (this.children[0]) {
      return this.children[0].getBoundingClientRect().width / this.getBoundingClientRect().width;
    }
    else {
      return 1;
    }
  }

  get childMarginLeft () {
    return getComputedStyle(this.children[0]).marginLeft;
  }

  slideToNext () {
    console.log('slideToNext');
  }

  slideToPrevious () {
    console.log('slideToPrevious');
  }
}

registerElement('bulbs-video-carousel-slider', CarouselSlider);
