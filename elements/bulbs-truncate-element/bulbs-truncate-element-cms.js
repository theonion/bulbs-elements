import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsTruncateElement extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsTruncate-element
      </h1>
    `;
  }
}

registerElement('bulbs-truncate-element', EmbeddedBulbsTruncate-element);
