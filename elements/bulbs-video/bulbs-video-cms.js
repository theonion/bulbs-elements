import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register-element';

class EmbeddedBulbsVideo extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsVideo
      </h1>
    `;
  }
}

registerElement('bulbs-video', EmbeddedBulbsVideo);
