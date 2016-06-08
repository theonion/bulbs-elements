import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import { moveChildren, copyAttribute } from 'bulbs-elements/util';

export default class CarouselItem extends BulbsHTMLElement {
  createdCallback () {
    let anchor = document.createElement('a');

    copyAttribute('data-track-action', this, anchor);
    copyAttribute('data-track-category', this, anchor);
    copyAttribute('href', this, anchor);

    moveChildren(this, anchor);

    this.appendChild(anchor);
  }
}

registerElement('bulbs-carousel-item', CarouselItem);
