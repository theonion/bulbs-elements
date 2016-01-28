import { Field, Action } from 'bulbs-elements/store';

const SelectedAnswerField = new Field({
  initialState: null,
  selectAnswer: new Action(function (state, answer) {
    return (state && state.id === answer.id) ? null : answer;
  }),
});

export default SelectedAnswerField;
