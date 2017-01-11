import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

export class NextButton extends BulbsHTMLElement {
  constructor () {
    super();
    this.innerHTML = '<i class="fa fa-angle-right"></i>';
  }
}

export class PreviousButton extends BulbsHTMLElement {
  constructor () {
    super();
    this.innerHTML = '<i class="fa fa-angle-left"></i>';
  }
}

registerElement('bulbs-carousel-next', NextButton);
registerElement('bulbs-carousel-previous', PreviousButton);
