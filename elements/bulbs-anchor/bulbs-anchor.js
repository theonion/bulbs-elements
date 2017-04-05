import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import './bulbs-anchor.scss';

export default class BulbsAnchor extends BulbsHTMLElement {
  attachedCallback () {
   this.anchorElement = this.getAnchorElement(this);
   this.positionElement.bind(this);
   this.postionElement();

   window.addEventListener('resize', this.positionElement.bind(this));
  }

  getAnchorElement (el) {
    const anchorElementClass = el.getAttribute('anchor');
    return el.closest(anchorElementClass)
  }

  getAnchorPosition () {
    return this.anchorElement.getBoundingClientRect().left;
  }

  positionElement () {
    this.style.left = this.getAnchorPosition() + '';
  }
}

registerElement('bulbs-anchor', BulbsAnchor);
