const ControllerField = {
  initialState: {
    revealed: false,
  },
  actions: {
    revealPlayer (state) {
      state.revealed = true;
      return state;
    },
  },
};

export default ControllerField;
