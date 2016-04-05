import React from 'react';
import CampaignDisplay from './campaign-display';
import { createRenderer } from 'react-addons-test-utils';

describe('<campaign-display>', function() {
  let subject;
  let props;
  let shallowRenderer;
  beforeEach(() => {
    props = {
      campaignUrl: 'test campaign url',
      display: 'image',
    };
    shallowRenderer = createRenderer();
    shallowRenderer.render(<CampaignDisplay {...props}/>);
    subject = new CampaignDisplay(props);
  });

  describe('initialDispatch', function() {
    it('fetches campaign data for display', () => {
      let spy = chai.spy.on(subject.store.actions, 'fetchCampaign');
      subject.initialDispatch();
      expect(spy).to.have.been.called.with('test campaign url');
    });
  });
});
