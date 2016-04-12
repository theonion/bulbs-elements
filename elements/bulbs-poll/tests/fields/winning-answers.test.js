import { assert } from 'chai';
import WinningAnswersField from '../../fields/winning-answers';

describe('<bulbs-poll> WinningAnswersField', function () {
  let { actions } = WinningAnswersField;

  it('initialState', function () {
    assert.deepEqual(WinningAnswersField.initialState, []);
  });

  describe('collectWinningAnswers', function () {
    context('single winning answer', function () {
      let answers = [
        { total_votes: 10 },
        { total_votes: 5 },
        { total_votes: 0 },
      ];
      let nextState;

      beforeEach(function () {
        nextState = actions.collectWinningAnswers([], answers);
      });

      it('collects the winning answer', function () {
        assert.deepEqual(nextState, [
          answers[0],
        ]);
      });
    });

    context('multiple winning answers', function () {
      let answers = [
        { total_votes: 10 },
        { total_votes: 5 },
        { total_votes: 10 },
      ];
      let nextState;

      beforeEach(function () {
        nextState = actions.collectWinningAnswers([], answers);
      });

      it('collects the tying answers', function () {
        assert.deepEqual(nextState, [
          answers[0],
          answers[2],
        ]);
      });
    });
  });
});
