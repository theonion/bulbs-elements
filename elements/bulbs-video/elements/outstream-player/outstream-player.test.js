/* eslint-disable no-return-assign */
import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import OutstreamPlayer from './outstream-player';
import OutstreamPlayerRoot from './components/root';

import VideoField from '../../fields/video';
import VideoRequestField from '../../fields/video-request';
import ControllerField from '../../fields/controller';

describe('<outstream-player>', () => {
  let subject;
  let sandbox;
  let props;

  describe('PropTypes', () => {
    beforeEach(() => {
      subject = OutstreamPlayer.propTypes;
      sandbox = sinon.sandbox.create();
      sandbox.stub(window, 'fetch').returns(new Promise(resolve => resolve));
      props = {
      };
    });

    afterEach(() => {
      sandbox.restore();
    });
  });

  describe('schema', () => {
    beforeEach(() => subject = OutstreamPlayer.schema);

    it('has a video field', () => {
      expect(subject.video).to.eql(VideoField);
    });

    it('has a controller field', () => {
      expect(subject.controller).to.eql(ControllerField);
    });
  });

  describe('fetchVideo', () => {
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      subject = new OutstreamPlayer({ src: 'http://example.org/a-src' });
    });

    it('calls fetchVideo', () => {
      sinon.stub(subject, 'fetchVideo');
      subject.componentDidMount({ src: 'http://example.org/new-src' });
      expect(subject.fetchVideo).to.have.been.called;
    });
  });

  describe('render', () => {
    it('renders a OutstreamPlayerRoot', () => {
      expect(shallow(<OutstreamPlayer {...props}/>)).to.have.descendants(OutstreamPlayerRoot);
    });

    describe('OutstreamPlayerRoot.props', () => {
      let outstreamPlayer;
      beforeEach(() => {
        outstreamPlayer = new OutstreamPlayer(props);
        subject = outstreamPlayer.render().props;
      });

      it('passes actions through', () => {
        expect(subject.actions).to.eql(outstreamPlayer.store.actions);
      });

      it('merges video from state', () => {
        expect(subject.video).to.eql(outstreamPlayer.state.video);
      });
    });
  });
});
