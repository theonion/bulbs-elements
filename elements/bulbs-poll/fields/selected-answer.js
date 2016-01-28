import { Field, Action } from 'bulbs-elements/store';

const SelectedAnswerField = new Field({
  initialState: null,
  selectAnswer: new Action(function (state, answer) {
    return state === answer ? null : answer;
  }),
});

export default SelectedAnswerField;
