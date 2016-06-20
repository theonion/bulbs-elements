import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

export class NextButton extends BulbsHTMLElement {
  createdCallback () {
    this.innerHTML = '<i class="fa fa-chevron-right"></i>';
  }
}

export class PreviousButton extends BulbsHTMLElement {
  createdCallback () {
    this.innerHTML = '<i class="fa fa-chevron-left"></i>';
  }
}

registerElement('bulbs-carousel-next', NextButton);
registerElement('bulbs-carousel-previous', PreviousButton);
