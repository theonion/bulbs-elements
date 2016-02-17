import { Field, Action } from 'bulbs-elements/store';

const SrcField = new Field({
  initialState: '',
  setSrc: new Action(function (state, src, store) {
    return src;
  }),
});

export default SrcField;
