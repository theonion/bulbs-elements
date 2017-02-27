import util from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-truncate-element.scss';

class BulbsTruncateElement extends BulbsHTMLElement {

  attachedCallback () {
    let previousEl = this.previousElementSibling;
    this.addButton = this.addButton.bind(this);
    this.openElement = this.openElement.bind(this);
    this.addButton();
    this.addEventListener('click', this.openElement);
    previousEl.classList.add('bulbs-truncate-element-parent-active');
  }

  addButton () {
    this.readMoreButton = document.createElement('button');
    this.readMoreButton.classList.add('bulbs-truncate-element-button');
    this.readMoreButton.innerHTML = 'Continue Reading';
    this.appendChild(this.readMoreButton);
  }

  openElement () {
    let previousEl = this.previousElementSibling;
    previousEl.classList.remove('bulbs-truncate-element-parent-active');
    this.classList.add('bulbs-truncate-element-inactive');
  }
}

registerElement('bulbs-truncate-element', BulbsTruncateElement);

export default BulbsTruncateElement;
