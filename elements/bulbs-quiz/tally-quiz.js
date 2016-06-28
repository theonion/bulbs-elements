import $ from 'jquery';
import {
  sendResultAnalytics,
  OUTCOME_REVEAL_DURATION,
  OUTCOME_SCROLLTO_OFFSET_TOP,
} from './quiz';

export default class TallyQuiz {
  constructor (options) {
    this.element = options.element;
    this.options = options;
    $('.check-outcome', this.element).css('visibility', 'visible');
  }

  setup () {
    $('form', this.element).submit((event) => {
      event.preventDefault();
      $('.check-outcome', this.element).hide();
      this.checkOutcome();
    });
  }

  checkOutcome () {
    let quiz = this;
    let score = 0;
    let outcomes = $('.outcome', this.element);
    let bestOutcome = null;
    let maxMinScore = 0;

    $('input:checked', this.element).each(function (i, el) {
      score += parseInt($(el).attr('value'), 10);
    });

    $('input', this.element).prop('disabled', true);

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
        offset: { top: OUTCOME_SCROLLTO_OFFSET_TOP },
      });

      if (this.options.sendAnalytics) {
        sendResultAnalytics(bestOutcome);
      }
    }
  }
}
