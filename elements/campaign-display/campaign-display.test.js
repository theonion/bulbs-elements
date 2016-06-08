import React from 'react';
import CampaignDisplay from './campaign-display';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

describe('<campaign-display>', () => {
  let subject;
  let placement;
  let props;
  let src;
  let campaign;
  beforeEach(() => {
    placement = 'top';
    src = 'http://example.com';
    campaign = {
      id: 1,
      active: true,
      clickthrough_url: 'http://example.com/clickthrough',
      image_url: 'http://example.com/campain-img.jpg',
      name: 'Test Campaign',
    };

    props = {
      noLink: '',
      placement,
      preambleText: 'Presented by',
      src,
    };

    fetchMock.mock(src, campaign);
  });

  it('should require a src', () => {
    expect(() => {
      new CampaignDisplay({ placement: 'top' }); // eslint-disable-line
    }).to.throw('campaign-display component requires a src');
  });

  it('should require a placement', function() {
    expect(() => {
      new CampaignDisplay({ src: 'some/src '}); // eslint-disable-line
    }).to.throw('campaign-display component requires a placement');
  });

  it('accepts a no-link attribute', () => {
    subject = shallow(<CampaignDisplay {...props} campaign={campaign} />);
    expect(subject).to.have.prop('noLink', true);
  });

  describe('initialDispatch', () => {
    it('fetches campaign data for display', () => {
      subject = new CampaignDisplay(props);
      let spy = sinon.stub(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.calledWith(src);
    });
  });
});
