import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

class EmbeddedOnionVideo extends EmbededCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded OnionVideo
      </h1>
    `;
  }
}

registerElement('onion-video', EmbeddedOnionVideo);
