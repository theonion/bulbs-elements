import BulbsVideo from './bulbs-video';
import fetchMock from 'fetch-mock';

describe('<bulbs-video>', () => {
  let src = '//example.org/video-src.json';
  let subject;
  let props = {
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
  });

  describe('#componentWillReceiveProps', () => {
    let fetchSpy;
    let resetSpy;
    let newSrc;

    beforeEach(() => {
      subject = new BulbsVideo(props);
    });

    context('src did not change', () => {
      beforeEach(() => {
        fetchSpy = sinon.spy(subject.store.actions, 'fetchVideo');
        resetSpy = sinon.spy(subject.store.actions, 'resetController');
        subject.componentDidUpdate({ src });
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

      it('fetches video data', () => {
        expect(fetchSpy).to.have.been.calledWith(newSrc);
      });

      it('resets the controller', () => {
        expect(resetSpy).to.have.been.called;
      });
    });
  });

  describe('lazy loading', () => {
    let container;

    beforeEach((done) => {
      props.disableLazyLoading = false;

      container = document.createElement('div');

      container.innerHTML = `<div style="height: 1000px;"></div>`;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.innerHTML = '';
    });

    it('should not load video until it is within viewing threshold', (done) => {
      let videoElement = document.createElement('bulbs-video');
      videoElement.setAttribute('src', src);
      container.appendChild(videoElement);

      container.firstElementChild.style.height = '0px';
      try {
        window.dispatchEvent(new Event('scroll'));
      }
      catch (error) {
        const event = document.createEvent('Event');
        event.initEvent('scroll', false, true);
        window.dispatchEvent(event);
      }

      requestAnimationFrame(() => {
        expect($(container).find('.bulbs-video-root').length).to.equal(1);
        done();
      });
    });
  });
});
