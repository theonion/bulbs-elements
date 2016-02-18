import { Field, Action } from 'bulbs-elements/store';

const SelectedAnswerField = new Field({
  initialState: {},
  selectAnswer: new Action(function (state, answer) {
    console.log('selectAnswer', state, answer);
    return (state && state.id === answer.id) ? {} : answer;
  }),
});

export default SelectedAnswerField;
