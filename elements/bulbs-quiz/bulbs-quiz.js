import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import invariant from 'invariant';
import { contains } from 'lodash';
import CosmodeQuiz from './cosmode-quiz';
import MultipleChoiceQuiz from './multiple-choice-quiz';
import TallyQuiz from './tally-quiz';
import TestQuiz from './test-quiz';

import './bulbs-quiz.scss';

function getQuizType (quizTypeClass) {
  let matches = quizTypeClass.match(/quiz-style-(\w+)/);
  invariant(matches, 'bulbs-quiz: no valid quiz-style class present');
  return matches[1];
}

const QUIZ_TYPES = ['tally', 'test', 'multiple', 'cosmo'];

class BulbsQuiz extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.attributes['content-id'], 'bulb-quiz: content-id is undefined, add a content-id attribute');

    let $element = $(this);
    let quizType = getQuizType($element.attr('class'));
    let contentId = this.attributes['content-id'].value;

    switch (quizType) {
    case 'cosmo':
      this.quiz = new CosmodeQuiz({ element: $element });
      break;

    case 'tally':
      this.quiz = new TallyQuiz({ element: $element });
      break;

    case 'multiple':
      this.quiz = new MultipleChoiceQuiz({
        element: $element,
        sendAnalytics: contentId === 1333,
      });
      break;

    case 'test':
      this.quiz = new TestQuiz({
        element: $element,
        revealAllAnswers: $element.hasClass('quiz-show-all-answers'),
      });
      break;

    default:
      invariant(contains(QUIZ_TYPES, quizType), `bulbs-quiz: ${quizType} is not a valid quiz style`);
      break;
    }

    this.quiz.setup();
  }
}

registerElement('bulbs-quiz', BulbsQuiz);

export default BulbsQuiz;
