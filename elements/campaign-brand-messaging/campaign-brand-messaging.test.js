import './campaign-brand-messaging';
import fetchMock from 'fetch-mock';

describe('<campaign-brand-messaging>', function () {
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

    element = document.createElement('campaign-brand-messaging');
    element.setAttribute('src', src);

    setImmediate(function () {
      done();
    });
  });

  it('renders an <campaign-brand-messaging>', function () {
    expect(element.tagName.toLowerCase()).to.equal('campaign-brand-messaging');
  });

  it('tries to make a request based on the source', function () {
    element.attachedCallback();
    expect(fetchMock.called('http://example.com/campaign.json')).to.be.true;
  });

  it('sets the span appropriately', function () {
    element.handleRequestSuccess(campaign);
    expect(element.innerHTML).to.contain('<span>Buy our shit</span>');
  });
});
