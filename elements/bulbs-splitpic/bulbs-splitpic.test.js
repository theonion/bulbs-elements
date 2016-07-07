import { assert } from 'chai';

describe('<bulbs-splitpic>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('bulbs-splitpic');
  });

  it('renders an <bulbs-splitpic>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-splitpic');
  });
});
