import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-truncate-element.scss';

class BulbsTruncateElement extends BulbsHTMLElement {

  attachedCallback () {
    this.addButton = this.addButton.bind(this);    
    this.openElement = this.openElement.bind(this);
    $(this).prev().addClass('bulbs-truncate-element-parent-active');
    this.addButton();
    this.addEventListener('click', this.openElement);
  }

  addButton () {
    this.readMoreButton = document.createElement('button');
    this.readMoreButton.setAttribute('class', 'bulbs-truncate-element-button');
    this.readMoreButton.innerHTML = 'Read More';
    this.appendChild(this.readMoreButton);
  }

  openElement (event) {
    $(this).prev().removeClass('bulbs-truncate-element-parent-active');
    this.remove();
  }
}

registerElement('bulbs-truncate-element', BulbsTruncateElement);

export default BulbsTruncateElement;