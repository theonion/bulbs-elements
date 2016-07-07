import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsSplitpic extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsSplitpic
      </h1>
    `;
  }
}

registerElement('bulbs-splitpic', EmbeddedBulbsSplitpic);
