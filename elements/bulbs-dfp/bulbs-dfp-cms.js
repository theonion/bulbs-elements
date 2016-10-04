import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsDfp extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsDfp
      </h1>
    `;
  }
}

registerElement('bulbs-dfp', EmbeddedBulbsDfp);
