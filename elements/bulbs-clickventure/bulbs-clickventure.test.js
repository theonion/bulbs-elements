import { assert } from 'chai';

describe('<bulbs-clickventure>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('bulbs-clickventure');
  });

  it('renders an <bulbs-clickventure>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-clickventure');
  });
});
