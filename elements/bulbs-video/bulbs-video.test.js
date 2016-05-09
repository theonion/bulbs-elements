import BulbsVideo from './bulbs-video';
import fetchMock from 'fetch-mock';

describe('<bulbs-video>', () => {
  let src = '//example.org/video-src.json';
  let subject;
  let props = {
    src,
  };

  beforeEach(() => {
    BulbsVideo.prototype.setState = sinon.spy();
    fetchMock.mock(src, {});
    subject = new BulbsVideo(props);
  });

  describe('#initialDispatch', () => {
    it('fetches video data', () => {
      let spy = sinon.spy(subject.store.actions, 'fetchVideo');
      subject.initialDispatch();
      expect(spy).to.have.been.calledWith(src);
    });
  });

  describe('#componentWillReceiveProps', () => {
    let fetchSpy;
    let resetSpy;
    let newSrc;

    context('src did not change', () => {
      beforeEach(() => {
        fetchSpy = sinon.spy(subject.store.actions, 'fetchVideo');
        resetSpy = sinon.spy(subject.store.actions, 'resetController');
        subject.componentWillReceiveProps({ src });
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
        subject.componentWillReceiveProps({ src: newSrc });
      });

      it('fetches video data', () => {
        expect(fetchSpy).to.have.been.calledWith(newSrc);
      });

      it('resets the controller', () => {
        expect(resetSpy).to.have.been.called;
      });
    });
  });
});
