import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

import './carousel-item.scss';

function copyAttribute(attribute, from, to) {
  to.setAttribute(attribute, from.getAttribute(attribute));
}

export default class CarouselItem extends BulbsHTMLElement {
  createdCallback() {
    let anchor = document.createElement('a');

    copyAttribute('data-track-action', this, anchor);
    copyAttribute('data-track-category', this, anchor);
    copyAttribute('href', this, anchor);

    while (this.firstChild) {
      anchor.appendChild(this.firstChild);
    }

    this.appendChild(anchor);
  }
}

registerElement('bulbs-video-carousel-item', CarouselItem);
