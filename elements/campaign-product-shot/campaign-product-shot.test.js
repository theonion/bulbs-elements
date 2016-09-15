import { assert } from 'chai';
import './campaign-product-shot';
import fetchMock from 'fetch-mock';

describe('<campaign-product-shot>', function () {
  let element;
  let src;
  let campaign;

  beforeEach(function (done) {
    src = 'http://example.com'
    campaign = {
      id: 1,
      active: true,
      clickthrough_url: 'http://example.com/clickthrough',
      image_url: 'http://example.com/campain-img.jpg',
      name: 'Test Campaign',
      product_shot_url: 'http://example.com/campaign-img.jpg',
      brand_messaging: 'Buy our shit'
    };

    element = document.createElement('campaign-product-shot');
    element.setAttribute('src', src);


    fetchMock.mock(src, campaign);

    setImmediate(function() {
      done();
    });
  });

  it('renders an <campaign-product-shot>', function () {
    element.attachedCallback();
    assert.equal(element.tagName.toLowerCase(), 'campaign-product-shot');
    assert.equal(element.innerHTML, '<div class=\'campaign-product-shot\'><img src=\'http://example.com/campaign-img.jpg\'></div>');
  });
});
