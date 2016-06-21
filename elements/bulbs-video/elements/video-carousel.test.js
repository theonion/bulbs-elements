import { VideoCarouselState } from './video-carousel';

describe('<bulbs-video-carousel>', () => {
  let subject;
  let carousel;
  let container;
  let videoMeta;
  let videoPlayer;
  let firstItem;
  let secondItem;
  let anchoredItem;

  beforeEach((done) => {
    container = document.createElement('div');

    container.innerHTML = `
      <bulbs-video-carousel>
        <bulbs-video></bulbs-video>
        <bulbs-video-meta></bulbs-video-meta>

        <bulbs-carousel>
          <bulbs-carousel-slider>

            <bulbs-carousel-item id='first'>
              <bulbs-video-summary now-playing></bulbs-video-summary>
            </bulbs-carousel-item>

            <bulbs-carousel-item
              id='second'
              src='//example.org/video.json'
              share-url='//example.org/share-me'
            >
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
      videoMeta = container.querySelector('bulbs-video-meta');
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

  describe('selectVideo', () => {
    it('sets an autoplay attribute on the video player', () => {
      let summary = firstItem.querySelector('bulbs-video-summary');
      expect(videoPlayer.getAttribute('autoplay')).to.be.null;
      subject.selectVideo(summary);
      expect(videoPlayer.getAttribute('autoplay')).to.eql('');
    });

    it('selects a video', () => {
      let summary = firstItem.querySelector('bulbs-video-summary');
      sinon.spy(subject.state, 'selectVideo');
      subject.selectVideo(summary);
      expect(subject.state.selectVideo).to.have.been.calledWith(summary);
    });
  });

  describe('applyState', () => {
    beforeEach(() => sinon.spy(subject, 'doApplyState'));

    it('calls through to doApplyState', () => {
      expect(subject.doApplyState).not.to.have.been.called;
    });

    context('with no currentVideo', () => {
      it('does nothing', () => {
        expect(subject.doApplyState).not.to.have.been.called;
      });
    });
  });

  describe('doApplyState', () => {
    context('firstItem selected', () => {
      it('removes now-playing from current playing elements', () => {
        secondItem.setAttribute('now-playing', '');
        subject.doApplyState();

        expect(secondItem.getAttribute('now-playing')).to.be.null;
      });
    });

    context('secondItem selected', () => {
      beforeEach(() => {
        subject.state.selectVideo(secondItem.children[0]);
        subject.doApplyState();
      });

      it('sets now-plaing attribute on the current video', () => {
        expect(secondItem.children[0].getAttribute('now-playing')).to.eql('');
      });

      it('sets now-playing on the bulbs-carousel-item wrapping the current video', () => {
        expect(secondItem.getAttribute('now-playing')).to.eql('');
      });

      it('updates the src of the <bulbs-video>', () => {
        expect(videoPlayer.getAttribute('src')).to.eql('//example.org/video.json');
      });

      it('updates the src of the <bulbs-video-meta>', () => {
        expect(videoMeta.getAttribute('src')).to.eql('//example.org/video.json');
      });

      it('updates the share-url of the <bulbs-video-meta>', () => {
        expect(videoMeta.getAttribute('share-url')).to.eql('//example.org/share-me');
      });
    });
  });

  describe('VideoCarouselState', () => {
    let currentVideo;

    beforeEach(() => {
      currentVideo = document.createElement('bulbs-video-summary');
      subject = new VideoCarouselState({ currentVideo });
    });

    describe('constructor', () => {
      context('with an invalid currentVideo', () => {
        it('throws an error', () => {
          expect(() => new VideoCarouselState({ currentVideo: 'bad' })).to.throw(
            /MUST have a <bulbs-video-summary> as currentVideo prop./
          );
        });
      });
    });

    describe('currentVideo', () => {
      it('aliases to props', () => {
        subject.props.currentVideo = 'currentVideo';
        expect(subject.currentVideo).to.eql('currentVideo');
      });
    });

    describe('videoUrl', () => {
      it('reads from the currentVideo src', () => {
        subject.props.currentVideo = secondItem.children[0];
        expect(subject.videoUrl).to.eql('//example.org/video.json');
      });
    });

    describe('shareUrl', () => {
      it('reads from the currentVideo share-url attribute', () => {
        subject.props.currentVideo = secondItem.children[0];
        expect(subject.shareUrl).to.eql('//example.org/share-me');
      });
    });

    describe('selectVideo', () => {
      it('selects the video', () => {
        let nextVideo = document.createElement('bulbs-video-summary');
        subject.selectVideo(nextVideo);
        expect(subject.currentVideo).to.eql(nextVideo);
      });

      context('with an invalid video', () => {
        it('throws an error', () => {
          expect(() => subject.selectVideo(document.createElement('bad-el'))).to.throw(
            /MUST have a <bulbs-video-summary> as currentVideo prop./
          );
        });
      });
    });
  });
});
