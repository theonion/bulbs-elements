import { assert } from 'chai';

describe('<bulbs-video>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('bulbs-video');
  });

  it('renders an <bulbs-video>', function () {
    assert.equal(element.tagName.toLowerCase(), 'bulbs-video');
  });
});
