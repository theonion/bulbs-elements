import { resizeParentFrame } from 'bulbs-elements/util';
import {
  sendResultAnalytics,
  OUTCOME_REVEAL_DURATION,
  OUTCOME_SCROLLTO_OFFSET_TOP,
} from './quiz';

export default class CosmodeQuiz {
  constructor (options) {
    this.element = options.element;
    this.options = options;
    $('.check-outcome', this.element).css('visibility', 'visible');
  }

  setup () {
    $('.question', this.element).each(function (i, elQuestion) {
      let $elQuestion = $(elQuestion);
      $elQuestion.attr('data-unanswered', 'true');

      $('.answer', $elQuestion).each((n, elAnswer) => {
        $('input', elAnswer).change(() => {
          // reveal post-answer content
          $elQuestion.attr('data-unanswered', 'false');
          $('.post-answer-body', $elQuestion).show(100, function () {
            window.picturefill();
          });
        });
      });
    });

    $('form', this.element).submit((event) => {
      event.preventDefault();
      $('.check-outcome', this.element).hide();
      this.checkOutcome();
    });
  }

  checkOutcome () { // eslint-disable-line consistent-return
    let quiz = this;
    let form = $('form', this.element);
    let formData = form.serializeArray();
    let numQuestions = $('.question', this.element).length;

    // Make sure they answered all the questions
    if (formData.length !== numQuestions) {
      $('.check-outcome', this.element).show();
      let firstUnanswered = $('.question[data-unanswered="true"]', this.element)[0];
      $(window).scrollTo(firstUnanswered, { duration: 250 });
      return false;
    }

    // First we count up the outcomes associated with the user's answers:
    $('input', this.element).prop('disabled', true);
    let score = 0;
    for (let i = 0; i < formData.length; i++) {
      let datum = formData[i];
      score += parseInt(datum.value, 10);
    }

    let outcomes = $('.outcome', this.element);
    let bestOutcome = null;
    let maxMinScore = 0;

    for (let i = 0; i < outcomes.length; i++) {
      let outcome = $(outcomes[i]);
      let minScore = parseInt(outcome.attr('data-min-score'), 10);
      if (minScore <= score && minScore >= maxMinScore) {
        bestOutcome = outcome;
        maxMinScore = minScore;
      }
    }

    if (bestOutcome) {
      $('.outcomes', this.element).show();
      resizeParentFrame();
      bestOutcome.show(OUTCOME_REVEAL_DURATION, () => {
        window.picturefill();
        quiz.element.addClass('completed');
        resizeParentFrame();
      });

      $(window).scrollTo(bestOutcome, {
        duration: OUTCOME_REVEAL_DURATION,
        offset: { top: OUTCOME_SCROLLTO_OFFSET_TOP },
      });

      if (this.options.sendAnalytics) {
        sendResultAnalytics(bestOutcome);
      }
    }
  }
}
