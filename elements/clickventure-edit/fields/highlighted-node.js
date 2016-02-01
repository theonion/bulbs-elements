import { Field, Action } from 'bulbs-elements/store';

const HighlightedNodeField = new Field({
  initialState: {},

  highlightNode: new Action (function (state, node) {
    return node.id === state.id ? {} : { id: node.id };
  }),
});

export default HighlightedNodeField

