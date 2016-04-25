const InitialController = {
  revealed: false,
};

const ControllerField = {
  initialState: InitialController,
  actions: {
    revealPlayer (state) {
      state.revealed = true;
      return state;
    },
    resetController () {
      return InitialController;
    },
  },
};

export default ControllerField;
