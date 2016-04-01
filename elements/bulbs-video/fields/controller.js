import { Field, Action } from 'bulbs-elements/store';

const ControllerField = new Field({
  initialState: {
    revealed: false,
  },
  revealPlayer: new Action(function (state) {
    state.revealed = true;
    return state;
  }),
});

export default ControllerField;
