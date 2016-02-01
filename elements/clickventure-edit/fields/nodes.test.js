import { assert } from 'chai';
import NodesField from './nodes';

describe('NodesField', function () {
  let { actions } = NodesField;

  it('maps a nodes array into a nodes hash', function () {
    let node1 = { id: 1 };
    let node2 = { id: 2 };
    let nodes = [
      node1, node2,
    ];

    let nextState = actions.setNodes.invoke({}, nodes);

    assert.deepEqual(nextState, {
      1: node1,
      2: node2,
    });
  })
});
