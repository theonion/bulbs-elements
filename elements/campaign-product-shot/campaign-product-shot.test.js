import './campaign-product-shot';
import fetchMock from 'fetch-mock';

describe('<campaign-product-shot>', function () {
  let element;
  let src;
  let campaign;

  beforeEach(function (done) {
    fetchMock.restore();
    src = 'http://example.com/campaign.json';
    campaign = {
      id: 1,
      active: true,
      clickthrough_url: 'http://example.com/clickthrough',
      image_url: 'http://example.com/campaign-img.jpg',
      name: 'Test Campaign',
      product_shot_url: 'http://example.com/prodcut-shot.jpg',
      brand_messaging: 'Buy our shit',
    };
    fetchMock.mock(src, campaign);
    fetchMock.mock(campaing.product_shot_url);

    element = document.createElement('campaign-product-shot');
    element.setAttribute('src', src);

    setImmediate(done);
  });

  it('renders an <campaign-product-shot>', function () {
    expect(element.tagName.toLowerCase()).to.equal('campaign-product-shot');
  });

  it('tries to make a request based on the source', function () {
    element.attachedCallback();
    expect(fetchMock.called('http://example.com/campaign.json')).to.be.true;
  });

  it('sets the image source appropriately', function () {
    element.handleRequestSuccess(campaign);
    expect(element.innerHTML).to.contain('http://example.com/prodcut-shot.jpg');
  });

  it('renders a link with given clickthrough url', function () {
    element.handleRequestSuccess(campaign);

    expect(
      element.querySelector('a[href="' + campaign.clickthrough_url + '"]')
    ).to.not.be.null;
  });
});
