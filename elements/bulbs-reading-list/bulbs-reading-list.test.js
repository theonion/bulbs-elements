import { assert } from 'chai';

describe('<bulbs-reading-list>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('bulbs-reading-list');
  });

  it('renders an <bulbs-reading-list>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-reading-list');
  });
});
