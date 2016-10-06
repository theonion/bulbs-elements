import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsPinnedElement extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsPinned-element
      </h1>
    `;
  }
}

registerElement('bulbs-pinned-element', EmbeddedBulbsPinnedElement);
