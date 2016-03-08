import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsVideo extends EmbededCMSElement {
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
