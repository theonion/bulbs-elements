import './video-carousel';

describe('<bulbs-video-carousel>', () => {
  let subject;
  let carousel;
  let container;
  let videoPlayer;
  let firstItem;
  let secondItem;
  let anchoredItem;

  beforeEach((done) => {
    container = document.createElement('div');

    container.innerHTML = `
      <bulbs-video-carousel>
        <bulbs-video></bulbs-video>

        <bulbs-carousel>
          <bulbs-carousel-slider>

            <bulbs-carousel-item id='first'>
              <bulbs-video-summary now-playing></bulbs-video-summary>
            </bulbs-carousel-item>

            <bulbs-carousel-item id='second'>
              <bulbs-video-summary></bulbs-video-summary>
            </bulbs-carousel-item>

            <bulbs-carousel-item id='anchored'>
              <a href='#anchor'>
                <bulbs-video-summary></bulbs-video-summary>
              </a>
            </bulbs-carousel-item>

          </bulbs-carousel-slider>
        </bulbs-carousel>
      </bulbs-video-carousel>
    `;

    document.body.appendChild(container);

    // polyfill is asynchronous in some browser environments.
    requestAnimationFrame(() => {
      subject = container.querySelector('bulbs-video-carousel');
      carousel = container.querySelector('bulbs-carousel');
      videoPlayer = container.querySelector('bulbs-video');
      firstItem = container.querySelector('#first');
      secondItem = container.querySelector('#second');
      anchoredItem = container.querySelector('#anchored');

      sinon.spy(carousel, 'addEventListener');
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

    it('attaches click handler to the carousel', () => {
      subject.attachedCallback();
      expect(carousel.addEventListener).to.have.been.calledWith(
        'click', subject.handleClick
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
        let summary = firstItem.querySelector('bulbs-video-summary');
        summary.click = sinon.stub();
        subject.playerEnded();
        expect(summary.click).not.to.have.been.called;
      });
    });

    context('an item is currently playing', () => {
      beforeEach(() => {
        firstItem.setAttribute('now-playing', '');
      });

      it('clicks on the next item in carousel', () => {
        let summary = secondItem.querySelector('bulbs-video-summary');
        summary.click = sinon.stub();
        subject.playerEnded();
        expect(summary.click).to.have.been.called;
      });
    });

    context('the last item is currently playing', () => {
      beforeEach(() => {
        anchoredItem.remove();
        secondItem.setAttribute('now-playing', '');
      });

      it('clicks on the first item in carousel', () => {
        let anchor = firstItem.querySelector('bulbs-video-summary');
        anchor.click = sinon.stub();
        subject.playerEnded();
        expect(anchor.click).to.have.been.called;
      });
    });
  });

  describe('handleClick', () => {
    context('item has an anchor tag', () => {
      it('does nothing', () => {
        sinon.spy(subject, 'selectVideo');
        let event = {
          target: anchoredItem,
          preventDefault: sinon.stub(),
        };
        subject.handleClick(event);

        expect(event.preventDefault).not.have.been.called;
        expect(subject.selectVideo).not.to.have.been.called;
      });
    });

    context('item does not have an anchor tag', () => {
      it('replaces the video in the carousel player', () => {
        sinon.stub(subject, 'selectVideo');
        let event = {
          target: firstItem,
          preventDefault: sinon.stub(),
        };
        subject.handleClick(event);

        expect(event.preventDefault).to.have.been.called;
        expect(subject.selectVideo).to.have.been.calledWith(firstItem.children[0]);
      });
    });
  });
});
