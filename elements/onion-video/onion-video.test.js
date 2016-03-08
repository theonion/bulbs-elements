import { assert } from 'chai';

describe('<onion-video>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('onion-video');
  });

  it('renders an <onion-video>', function () {
    assert.equal(element.tagName.toLowerCase(), 'onion-video');
  });
});
