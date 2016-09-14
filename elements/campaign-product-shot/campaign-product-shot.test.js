import { assert } from 'chai';

describe('<campaign-product-shot>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('campaign-product-shot');
  });

  it('renders an <campaign-product-shot>', function () {
    assert.equal(element.tagName.toLowerCase(), 'campaign-product-shot');
  });
});
