import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-quiz.scss';
import invariant from 'invariant';
import { contains } from 'lodash';

const QUIZ_TYPES = [
  'cosmo',
  'multiple',
  'tally',
  'test',
];

class BulbsQuiz extends BulbsHTMLElement {
  get quizType () {
    let matches = this.className.match(/quiz-style-(\w+)/);
    return matches ? matches[1] : null;
  }

  validate () {
    invariant(this.type, 'bulbs-quiz requires a quiz-style-<type> class');
    let invalidTypeMessage = `bulbs-quiz ${this.type} is not a valid type, use one of: ${QUIZ_TYPES.join(', ')}`;
    invariant(contains(QUIZ_TYPES, this.quizType), invalidTypeMessage);
  }

  attachedCallback () {
    this.validate();
  }
}

registerElement('bulbs-quiz', BulbsQuiz);

export default BulbsQuiz;
