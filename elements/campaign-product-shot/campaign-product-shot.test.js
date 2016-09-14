import { assert } from 'chai';

describe('<campaign-product-shot>', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('campaign-product-shot');
    element.setAttribute("src", "http://localhost:8080/fixtures/campaign-display/campaign.json");
    element.attachedCallback();
  });

  it('renders an <campaign-product-shot>', function () {
    assert.equal(element.tagName.toLowerCase(), 'campaign-product-shot');
  });
});
