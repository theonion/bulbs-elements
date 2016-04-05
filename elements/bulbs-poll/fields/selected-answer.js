const SelectedAnswerField = {
  initialState: {},
  actions: {
    selectAnswer: function (state, answer) {
      return (state && state.id === answer.id) ? {} : answer;
    },
  },
};

export default SelectedAnswerField;
