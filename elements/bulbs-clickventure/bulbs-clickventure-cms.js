import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register-element';

class EmbeddedBulbsClickventure extends EmbededCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsClickventure
      </h1>
    `;
  }
}

registerElement('bulbs-clickventure', EmbeddedBulbsClickventure);
