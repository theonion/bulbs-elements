import { mount } from 'enzyme';
import React from 'react';

import BulbsVideo from './bulbs-video';
import fetchMock from 'fetch-mock';

import { scrollingElement } from 'bulbs-elements/util';

describe('<bulbs-video>', () => {
  let autoplay = '';
  let src = '//example.org/video-src.json';
  let subject;
  let props = {
    autoplay,
    src,
    disableLazyLoading: true,
  };

  beforeEach(() => {
    BulbsVideo.prototype.setState = sinon.spy();
    fetchMock.mock(src, {});
  });

  describe('#initialDispatch', () => {

    beforeEach(() => {
      subject = new BulbsVideo(props);
    });

    it('fetches video data', () => {
      let spy = sinon.spy(subject.store.actions, 'fetchVideo');
      subject.initialDispatch();
      expect(spy).to.have.been.calledWith(src);
    });

    context('autoplay is true', () => {
      it('reveals the player', () => {
        let spy = sinon.spy(subject.store.actions, 'revealPlayer');
        subject.props.autoplay = '';
        subject.initialDispatch();
        expect(spy).to.have.been.called;
      });
    });

    context('autoplayInView is true', () => {
      it('reveals the player', () => {
        let spy = sinon.spy(subject.store.actions, 'revealPlayer');
        subject.props.autoplayInView = '';
        subject.initialDispatch();
        expect(spy).to.have.been.called;
      });
    });
  });

  describe('#componentWillReceiveProps', () => {
    let fetchSpy;
    let resetSpy;
    let newSrc;
    let newAutoplay;

    beforeEach(() => {
      subject = new BulbsVideo(props);
    });

    context('src and autoplay did not change', () => {
      beforeEach(() => {
        fetchSpy = sinon.spy(subject.store.actions, 'fetchVideo');
        resetSpy = sinon.spy(subject.store.actions, 'resetController');
        subject.componentDidUpdate({ autoplay, src });
        newSrc = src;
      });

      it('does not fetch data', () => {
        expect(fetchSpy).not.to.have.been.called;
      });

      it('resets the controller', () => {
        expect(resetSpy).not.to.have.been.called;
      });
    });

    context('src did change', () => {
      beforeEach(() => {
        fetchSpy = sinon.spy(subject.store.actions, 'fetchVideo');
        resetSpy = sinon.spy(subject.store.actions, 'resetController');
        newSrc = '//example.org/new-video-src.html';
        fetchMock.mock(newSrc, {});
        subject.props.src = newSrc;
        subject.componentDidUpdate({ src });
      });

      it('fetches video data', (done) => {
        setImmediate(() => {
          expect(fetchSpy).to.have.been.calledWith(newSrc);
          done();
        });
      });

      it('resets the controller', (done) => {
        setImmediate(() => {
          expect(resetSpy).to.have.been.called;
          done();
        });
      });
    });

    context('autoplay did change', () => {
      beforeEach(() => {
        fetchSpy = sinon.spy(subject.store.actions, 'fetchVideo');
        resetSpy = sinon.spy(subject.store.actions, 'resetController');
        newAutoplay = false;
        fetchMock.mock(src, {});
        subject.props.autoplay = newAutoplay;
        subject.componentDidUpdate({ autoplay, src });
      });

      it('fetches video data', (done) => {
        setImmediate(() => {
          expect(fetchSpy).to.have.been.calledWith(newSrc);
          done();
        });
      });

      it('resets the controller', (done) => {
        setImmediate(() => {
          expect(resetSpy).to.have.been.called;
          done();
        });
      });
    });
  });

  describe('lazy loading', () => {
    let container;

    beforeEach((done) => {
      props.disableLazyLoading = false;

      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '200%';
      document.body.appendChild(container);
      setImmediate(done);
    });

    afterEach(() => {
      container.remove();
    });

    it('should not load video until it is within viewing threshold', (done) => {
      mount(
        <BulbsVideo src={src} />,
        { attachTo: container }
      );

      container.style.top = '0';
      scrollingElement.scrollTop += 1;

      setImmediate(() => {
        expect(container.querySelector('.bulbs-video-root')).not.to.be.null;
        done();
      });
    });
  });
});

