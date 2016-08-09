import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsReading-list extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsReading-list
      </h1>
    `;
  }
}

registerElement('bulbs-reading-list', EmbeddedBulbsReading-list);
