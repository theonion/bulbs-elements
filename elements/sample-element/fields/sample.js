import { Field, Action } from 'bulbs-elements/store';

const SampleField = new Field({
  initialState: {
    things: [],
  },
  initialAction: new Action(function () {
    return {
      things: [
        'Thing One',
        'Thing Two',
      ],
    };
  }),
});

export default SampleField;
