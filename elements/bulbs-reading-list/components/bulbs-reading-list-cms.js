import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register-element';

class EmbeddedBulbsReadingList extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsReadingList
      </h1>
    `;
  }
}

registerElement('bulbs-reading-list', EmbeddedBulbsReadingList);
