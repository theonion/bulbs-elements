import { assert } from 'chai';
import SelectedAnswerField from './selected-answer';

describe('SelectedAnswerField', function () {
  let { actions } = SelectedAnswerField;

  it('initialState', function () {
    assert.deepEqual(SelectedAnswerField.initialState, {});
  });

  describe('selectAnswer', function () {
    let answer1 = { id: 1 };
    let answer2 = { id: 2 };
    let { selectAnswer } = actions;

    it('selects first answer', function () {
      let nextState = selectAnswer.invoke(null, answer1);
      assert.equal(nextState, answer1);
    });

    it('selects new answers', function () {
      let nextState = selectAnswer.invoke(answer2, answer1);
      assert.equal(nextState, answer1);
    });

    it('returns null if answer selected again', function () {
      let nextState = selectAnswer.invoke(answer1, answer1);
      assert.deepEqual(nextState, {});
    });
  });
});
