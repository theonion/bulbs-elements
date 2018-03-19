import { resizeParentFrame } from 'bulbs-elements/util';
import {
  sendResultAnalytics,
  OUTCOME_REVEAL_DURATION,
  OUTCOME_SCROLLTO_OFFSET_TOP,
} from './quiz';

export default class MultipleChoiceQuiz {
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

    $('form', this.element).submit(function (event) {
      event.preventDefault();
      $('.check-outcome', this.element).hide();
      this.checkOutcome();
    }.bind(this));
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
    let counts = {};
    if (formData.length > 0) {
      for (let i = 0; i < formData.length; i++) {
        let datum = formData[i];
        let outcomeId = parseInt(datum.value, 10);
        // sometimes the answer doesnt correspond to an outcome:
        if (!isNaN(outcomeId)) {
          let thisCount = counts[outcomeId] ? counts[outcomeId] + 1 : 1;
          counts[outcomeId] = thisCount;
        }
      }
    }
    else {
      // Sometimes we get really zen and don't want any questions at all.
      // In that case, we just select the first outcome.
      let outcomeId = $('.outcome', this.element).data('id');
      counts[outcomeId] = 1;
    }

    // Create an ordered list of outcome possibilities:
    let countStack = [];
    for (let key in counts) {
      if (counts.hasOwnProperty(key)) {
        let countNum = counts[key];
        countStack.push({
          id: key,
          count: countNum,
        });
      }
    }

    countStack.sort(function (a, b) {
      return a.count - b.count;
    });

    let outcomeId = 0;
    let bestOutcome;

    // walk through the potential outcomes until we find something suitable:
    while (!outcomeId && countStack.length > 0) {
      // filter require-perfect outcomes with imperfect counts
      let count = countStack.pop();
      bestOutcome = $('#outcome-' + count.id);
      if (!(bestOutcome.data('require-perfect') && count.count !== formData.length)) {
        outcomeId = count.id;
      }
    }

    // If there's an outcome, show it.
    if (outcomeId) {
      $('.outcomes', this.element).show();
      resizeParentFrame();
      bestOutcome.show(OUTCOME_REVEAL_DURATION, () => {
        if (!window.parent) {
          window.picturefill();
        }
        quiz.element.addClass('completed');

        resizeParentFrame();
      });

      $(window).scrollTo(bestOutcome, {
        duration: OUTCOME_REVEAL_DURATION,
        offset: { top: OUTCOME_SCROLLTO_OFFSET_TOP },
      });

      // freeze the inputs
      $('input', this.element).prop('disabled', true);
      if (this.options.sendAnalytics) {
        sendResultAnalytics(bestOutcome);
      }
    }
  }
}
