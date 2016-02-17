import { Field, Action } from 'bulbs-elements/store';

const SrcField = new Field({
  initialState: '',
  setSrc: new Action(function (state, src) {
    return src;
  }),
});

export default SrcField;
