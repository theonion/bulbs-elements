import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

class EmbeddedBulbsQuiz extends EmbededCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded BulbsQuiz
      </h1>
    `;
  }
}

registerElement('bulbs-quiz', EmbeddedBulbsQuiz);
