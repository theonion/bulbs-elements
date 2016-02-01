import { Field, Action } from 'bulbs-elements/store';

const NodesField = new Field({
  initialState: {},

  setNodes: new Action (function (state, nodes) {
    let nodeHash = {};
    nodes.forEach((node) => nodeHash[node.id] = node);
    return nodeHash;
  }),

  toggleNodeStart: new Action(function (state, node) {
    let nextNode = Object.assign({}, state[node.id]);
    nextNode.start = !nextNode.start;
    if (nextNode.start) {
      nextNode.finish = false;
    }
    state[nextNode.id] = nextNode;
    return state;
  }),

  toggleNodeFinish: new Action(function (state, node) {
    let nextNode = Object.assign({}, state[node.id]);
    nextNode.finish = !nextNode.finish;
    if (nextNode.finish) {
      nextNode.start = false;
    }
    state[nextNode.id] = nextNode;
    return state;
  }),
});

export default NodesField
