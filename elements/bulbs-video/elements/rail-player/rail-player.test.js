/* eslint-disable no-return-assign */
import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import RailPlayer from './rail-player';
import RailPlayerRoot from './components/root';

import VideoField from '../../fields/video';
import VideoRequestField from '../../fields/video-request';
import ControllerField from '../../fields/controller';

describe('<rail-player>', () => {
  let subject;
  let sandbox;
  let props;

  describe('PropTypes', () => {
    beforeEach(() => {
      subject = RailPlayer.propTypes;
      sandbox = sinon.sandbox.create();
      sandbox.stub(window, 'fetch').returns(new Promise(resolve => resolve));
      props = {
        channel: 'channel',
        recircUrl: 'http://example.org/recirc',
        targetCampaignId: '12345',
        targetSpecialCoverage: 'fun-special-coverage',
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('requires a channel', () => {
      expect(subject.channel).to.eql(PropTypes.string.isRequired);
    });

    it('requires a src attribute', () => {
      expect(subject.src).to.eql(PropTypes.string.isRequired);
    });
  });

  describe('schema', () => {
    beforeEach(() => subject = RailPlayer.schema);

    it('has a video field', () => {
      expect(subject.video).to.eql(VideoField);
    });

    it('has a videoRequest field', () => {
      expect(subject.videoRequest).to.eql(VideoRequestField);
    });

    it('has a controller field', () => {
      expect(subject.controller).to.eql(ControllerField);
    });
  });

  describe('fetchVideo', () => {
    context('without campaign', () => {
      beforeEach(() => {
        subject = shallow(<RailPlayer src='http://example.org/a-src' {...props}/>).instance();
      });
      it('checks if ad block is enabled', () => {
        sinon.stub(subject.store.actions, 'fetchVideo');
        subject.isAdBlocked = true;
        subject.fetchVideo();
        expect(subject.store.actions.fetchVideo)
          .to.have.been.calledWith('http://example.org/a-src?ad_block_active=true');
      });
      it('checks if ad block is disabled', () => {
        sinon.stub(subject.store.actions, 'fetchVideo');
        subject.isAdBlocked = false;
        subject.fetchVideo();
        expect(subject.store.actions.fetchVideo).to.have.been.calledWith(
          'http://example.org/a-src');
      });
    });
    context('with campaign', () => {
      beforeEach(() => {
        subject = new RailPlayer({ src: 'http://example.org/a-src?campaign_id=534' });
      });
      it('checks if ad block is enabled and a query param already exists', () => {
        sinon.stub(subject.store.actions, 'fetchVideo');
        subject.isAdBlocked = true;
        subject.fetchVideo();
        expect(subject.store.actions.fetchVideo).to.have.been.calledWith(
          'http://example.org/a-src?campaign_id=534&ad_block_active=true');
      });
      it('checks if ad block is disabled', () => {
        sinon.stub(subject.store.actions, 'fetchVideo');
        subject.isAdBlocked = false;
        subject.fetchVideo();
        expect(subject.store.actions.fetchVideo).to.have.been.calledWith('http://example.org/a-src?campaign_id=534');
      });
    });
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      subject = new RailPlayer({ src: 'http://example.org/a-src' });
    });

    it('calls fetchVideo', () => {
      sinon.stub(subject, 'fetchVideo');
      subject.componentDidUpdate({ src: 'http://example.org/new-src' });
      expect(subject.fetchVideo).to.have.been.called;
    });
  });

  describe('componentDidUpdate', () => {
    context('src did change', () => {
      beforeEach(() => {
        subject = new RailPlayer({ src: 'http://example.org/a-src' });
      });

      it('calls fetchVideo', () => {
        sinon.stub(subject, 'fetchVideo');
        subject.componentDidUpdate({ src: 'http://example.org/new-src' });
        expect(subject.fetchVideo).to.have.been.called;
      });
    });

    context('src did not change', () => {
      beforeEach(() => {
        subject = new RailPlayer({ src: 'http://example.org/a-src' });
      });

      it('does not call fetchVideo', () => {
        sinon.spy(subject, 'fetchVideo');
        subject.componentDidUpdate({ src: subject.props.src });
        expect(subject.fetchVideo).not.to.have.been.called;
      });
    });
  });

  describe('render', () => {
    it('renders a RailPlayerRoot', () => {
      expect(shallow(<RailPlayer src="foobar.com" {...props}/>)).to.have.descendants(RailPlayerRoot);
    });

    describe('RailPlayerRoot.props', () => {
      let railPlayer;
      beforeEach(() => {
        railPlayer = new RailPlayer(props);
        subject = railPlayer.render().props;
      });

      it('renders a channel prop', () => {
        expect(subject.channel).to.eql('channel');
      });

      it('passes actions through', () => {
        expect(subject.actions).to.eql(railPlayer.store.actions);
      });

      it('passes recircUrl through', () => {
        expect(subject.recircUrl).to.eql('http://example.org/recirc');
      });

      it('passes targetCampaignId through', () => {
        expect(subject.targetCampaignId).to.eql('12345');
      });

      it('passes targetSpecialCoverage through', () => {
        expect(subject.targetSpecialCoverage).to.eql('fun-special-coverage');
      });

      it('merges video from state', () => {
        expect(subject.video).to.eql(railPlayer.state.video);
      });
    });
  });
});
