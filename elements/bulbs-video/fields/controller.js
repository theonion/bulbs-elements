const InitialController = {
  revealed: false,
};

export default {
  initialState: InitialController,
  actions: {
    revealPlayer(state) {
      state.revealed = true;
      return state;
    },
    resetController() {
      return InitialController;
    },
  },
};
