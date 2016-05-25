import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

export default class CarouselSlider extends BulbsHTMLElement {
  createdCallback () {
    if (window.jQuery && window.jQuery.fn.slick) {
      window.jQuery(this).slick();
    }
  }
}

registerElement('bulbs-video-carousel-slider', CarouselSlider);
