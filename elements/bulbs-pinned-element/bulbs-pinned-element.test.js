import { assert } from 'chai';

describe('<bulbs-pinned-element>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('bulbs-pinned-element');
  });

  it('renders an <bulbs-pinned-element>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-pinned-element');
  });
});
