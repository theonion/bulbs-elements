import { registerForBulbsCMS, EmbededCMSElement } from 'bulbs-elements/register';

class EmbeddedBulbsPoll extends EmbededCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-th-list'></i>
        Embedded Poll
      </h1>
    `;
  }
}

registerForBulbsCMS('bulbs-poll', EmbeddedBulbsPoll);
