const SelectedAnswerField = {
  initialState: {},
  actions: {
    selectAnswer(state, answer) {
      return (state && state.id === answer.id) ? {} : answer;
    },
  },
};

export default SelectedAnswerField;
