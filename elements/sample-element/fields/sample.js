import { Field, Action } from 'bulbs-elements/store';

const SampleField = new Field({
  initialState: {
    things: [],
  },
  initialAction: new Action(function (state, payload) {
    return {
      things: [
        'Thing One',
        'Thing Two',
      ],
    };
  }),
});

export default SampleField;
