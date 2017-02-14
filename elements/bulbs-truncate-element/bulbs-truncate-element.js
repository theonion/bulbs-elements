import util from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-truncate-element.scss';

class BulbsTruncateElement extends BulbsHTMLElement {

  attachedCallback () {
    this.addButton = this.addButton.bind(this);
    this.openElement = this.openElement.bind(this);
    this.addButton();
    this.addEventListener('click', this.openElement);
    $(this).prev().addClass('bulbs-truncate-element-parent-active');
  }

  addButton () {
    this.readMoreButton = document.createElement('button');
    this.readMoreButton.setAttribute('class', 'bulbs-truncate-element-button');
    this.readMoreButton.innerHTML = 'Continue Reading';
    this.appendChild(this.readMoreButton);
  }

  openElement () {
    $(this).prev().removeClass('bulbs-truncate-element-parent-active');
    util.getAnalyticsManager().sendEvent({
      eventCategory: 'Content',
      eventAction: 'Continue Reading',
      eventLabel: '#',
    });
    this.remove();
  }
}

registerElement('bulbs-truncate-element', BulbsTruncateElement);

export default BulbsTruncateElement;
