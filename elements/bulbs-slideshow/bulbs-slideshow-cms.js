import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register-element';

class EmbeddedBulbsSlideshow extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsSlideshow
      </h1>
    `;
  }
}

registerElement('bulbs-slideshow', EmbeddedBulbsSlideshow);
