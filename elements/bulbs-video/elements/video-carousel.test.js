import './video-carousel';

describe('<bulbs-video-carousel>', () => {
  let subject;
  let container;
  let videoPlayer;
  let firstItem;
  let secondItem;

  beforeEach((done) => {
    container = document.createElement('div');

    container.innerHTML = `
      <bulbs-video-carousel>
        <bulbs-video></bulbs-video>

        <bulbs-carousel>
          <bulbs-carousel-slider>
            <bulbs-carousel-item id='first'></bulbs-carousel-item>
            <bulbs-carousel-item id='second'></bulbs-carousel-item>
          </bulbs-carousel-slider>
        </bulbs-carousel>
      </bulbs-video-carousel>
    `;

    document.body.appendChild(container);

    // polyfill is asynchronous in some browser environments.
    requestAnimationFrame(() => {
      subject = container.querySelector('bulbs-video-carousel');
      videoPlayer = container.querySelector('bulbs-video');
      firstItem = container.querySelector('#first');
      secondItem = container.querySelector('#second');

      sinon.spy(videoPlayer, 'addEventListener');
      sinon.spy(videoPlayer, 'removeEventListener');
      done();
    });
  });

  afterEach(() => container.remove());

  describe('attachedCallback', () => {
    it('attaches playerEnded handler to videoPlayer', () => {
      subject.attachedCallback();
      expect(videoPlayer.addEventListener).to.have.been.calledWith(
        'ended', subject.playerEnded, true
      );
    });
  });

  describe('getAnchors', () => {
    it('gets links inside carousel items', () => {
      expect(subject.getAnchors().length).to.eql(2);
      expect(subject.getAnchors()).to.eql(
        container.querySelectorAll('a')
      );
    });
  });

  describe('detachedCallback', () => {
    it('removes playerEnded handler from videoPlayer', () => {
      subject.detachedCallback();
      expect(videoPlayer.removeEventListener).to.have.been.calledWith(
        'ended', subject.playerEnded
      );
    });
  });

  describe('playerEnded', () => {
    context('no other items in carousel', () => {
      beforeEach(() => {
        firstItem.setAttribute('now-playing', '');
        secondItem.remove();
      });

      it('does nothing', () => {
        let anchor = firstItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).not.to.have.been.called;
      });
    });

    context('an item is currently playing', () => {
      beforeEach(() => {
        firstItem.setAttribute('now-playing', '');
      });

      it('clicks on the next item in carousel', () => {
        let anchor = secondItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).to.have.been.called;
      });
    });

    context('the last item is currently playing', () => {
      beforeEach(() => {
        secondItem.setAttribute('now-playing', '');
      });

      it('clicks on the first item in carousel', () => {
        let anchor = firstItem.querySelector('a');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).to.have.been.called;
      });
    });
  });
});
