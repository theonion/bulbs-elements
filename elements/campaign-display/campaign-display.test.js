import React from 'react';
import CampaignDisplay from './campaign-display';
import { shallow } from 'enzyme';

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
  });

  it('should require a placement', function () {
    expect(() => {
      new CampaignDisplay({ src: 'some/src '}); // eslint-disable-line
    }).to.throw('campaign-display component requires a placement');
  });

  it('accepts a no-pixel attribute', () => {
    props.noPixel = '';
    subject = shallow(<CampaignDisplay {...props} campaign={campaign} />);
    expect(subject).to.have.prop('noPixel', true);
  });

  it('accepts a no-link attribute', () => {
    subject = shallow(<CampaignDisplay {...props} campaign={campaign} />);
    expect(subject).to.have.prop('noLink', true);
  });

  describe('componentDidUpdate', () => {
    let campaignUrl;
    let sandbox;

    beforeEach(() => {
      campaignUrl = 'http://example.com/campaign';
      sandbox = sinon.sandbox.create();

      let wrapper = shallow(
        <CampaignDisplay
          placement='test-placement'
          preambleText='foo'
          src={campaignUrl}
        />
      );
      subject = wrapper.instance();

      sinon.spy(subject, 'initialDispatch');
      sandbox.stub(subject.store.actions, 'fetchCampaign').returns(new Promise(resolve => resolve));
      subject.store.actions.handleFetchComplete(campaign);
    });

    context('src did not change', () => {
      it('does not reset campaign state', () => {
        subject.componentDidUpdate({ src: campaignUrl });
        expect(subject.state.campaign).to.eql(campaign);
      });

      it('does not call initialDispatch', () => {
        subject.componentDidUpdate({ src: campaignUrl });
        expect(subject.initialDispatch).not.to.have.been.called;
      });
    });

    context('src changed', () => {
      it('resets the campaign state', () => {
        subject.componentDidUpdate({ src: 'http://example.com/other-campaign' });
        expect(subject.state.campaign).to.be.null;
      });

      it('calls initialDispatch', () => {
        subject.componentDidUpdate({ src: 'http://example.com/other-campaign' });
        expect(subject.initialDispatch).to.have.been.called;
      });
    });
  });

  describe('initialDispatch', () => {
    context('src is falsey', () => {
      beforeEach(() => delete props.src);

      it('makes no request', () => {
        subject = new CampaignDisplay(props);
        let spy = sinon.stub(subject.store.actions, 'fetchCampaign');
        subject.initialDispatch();
        expect(spy).not.to.have.been.called;
      });
    });

    context('src is given', () => {
      it('fetches campaign data for display', () => {
        subject = new CampaignDisplay(props);
        let spy = sinon.stub(subject.store.actions, 'fetchCampaign');
        subject.initialDispatch();
        expect(spy).to.have.been.calledWith(src);
      });
    });
  });
});
