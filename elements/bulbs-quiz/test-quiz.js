import { resizeParentFrame } from 'bulbs-elements/util';
import {
  sendResultAnalytics,
  OUTCOME_REVEAL_DURATION,
  OUTCOME_SCROLLTO_OFFSET_TOP,
} from './quiz';

export default class TestQuiz {
  constructor (options) {
    this.element = options.element;
    this.options = options;
    $('.check-outcome', this.element).css('visibility', 'visible');
    this.revealAllAnswers = !!options.revealAllAnswers;
  }

  setup () {
    let quiz = this;
    $('.question', this.element).each((i, elQuestion) => {
      let $elQuestion = $(elQuestion);
      $('.answer', $elQuestion).each(function (n, elAnswer) {
        $elQuestion.attr('data-unanswered', 'true');
        $('input', elAnswer).change(() => {
          // You may only answer once per question:
          $('input', $elQuestion).attr('readonly', 'readonly');
          $(this).attr('readonly', null);
          $($elQuestion).attr('data-unanswered', 'false');

          // reveal explanation for the the selected answer only
          $('.answer-explanation', elAnswer).show(100, () => {
            window.picturefill();
          });
          let revealClass = quiz.revealAllAnswers ? 'reveal-all-answers' : 'reveal-answer';
          $($elQuestion).addClass(revealClass);

          // reveal post-answer content
          $('.post-answer-body', $elQuestion).show(100, () => {
            window.picturefill();
          });
        });
      });
    });

    $('form', this.element).submit(function (event) {
      event.preventDefault();
      $('.check-outcome', this.element).hide();
      this.checkOutcome();
    }.bind(this));
  }

  checkOutcome () { // eslint-disable-line consistent-return
    let quiz = this;
    let form = $('form', this.element);
    let numQuestions = $('.question', this.element).length;
    let numAnswered = $('.question[data-unanswered="false"]', this.element).length;
    // Make sure they answered all the questions
    if (numAnswered !== numQuestions) {
      $('.check-outcome', this.element).show();
      let firstUnanswered = $('.question[data-unanswered="true"]', this.element)[0];
      $(window).scrollTo(firstUnanswered, { duration: 250 });
      return false;
    }
    let formData = form.serializeArray();
    let score = 0;
    for (let i = 0; i < formData.length; i++) {
      let datum = formData[i];
      if (datum.value === 'True') {
        score++;
      }
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
      bestOutcome.show(OUTCOME_REVEAL_DURATION, () => {
        window.picturefill();
        quiz.element.addClass('completed');
      });
      $(window).scrollTo(bestOutcome, {
        duration: OUTCOME_REVEAL_DURATION,
        offset: {
          top: OUTCOME_SCROLLTO_OFFSET_TOP,
        },
      });
      if (this.options.sendAnalytics) {
        sendResultAnalytics(bestOutcome);
      }

      // Resize parent frame (if embed)
      resizeParentFrame();
    }
  }
}
