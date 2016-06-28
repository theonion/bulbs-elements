import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-quiz.scss';
import CosmodeQuiz from './cosmode-quiz';
import TestQuiz from './test-quiz';
import TallyQuiz from './tally-quiz';
import MultipleChoiceQuiz from './multiple-choice-quiz';

import $ from 'jquery';

class BulbsQuiz extends BulbsHTMLElement {
  attachedCallback () {
    $(document).on('detail-page-setup', (e, contentId) => {
      let $elContent = $('#content-' + contentId);

      $elContent.find('.quiz').each(function (i) {
        let elQuiz = $(e);
        let quiz;
        let styleSetup = {
          cosmo () {
            quiz = new CosmodeQuiz({ element: elQuiz });
          },

          tally () {
            quiz = new TallyQuiz({ element: elQuiz });
          },

          multiple () {
            quiz = new MultipleChoiceQuiz({
              element: elQuiz,
              sendAnalytics: contentId === 1333
            });
          },

          test () {
            quiz = new TestQuiz({
              element: elQuiz,
              revealAllAnswers: elQuiz.hasClass('quiz-show-all-answers'),
            });
          },
        };

        for (let quizStyle in styleSetup) {
          if (!styleSetup.hasOwnProperty(quizStyle)) {
            continue;
          }

          if (elQuiz.hasClass('quiz-style-' + quizStyle)) {
            let f = styleSetup[quizStyle];
            f();
          }
        }

        if (quiz) {
          quiz.setup();
        }
      });
    });
  }
}

registerElement('bulbs-quiz', BulbsQuiz);

export default BulbsQuiz;
