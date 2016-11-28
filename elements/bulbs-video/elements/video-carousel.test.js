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
              share-url='//example.org/share-me'
              share-title='Rad Example Title!'
              video-url='//example.org/video.json'
              campaign-url='//example.org/campaign'
            >
              <bulbs-video-summary></bulbs-video-summary>
            </bulbs-carousel-item>

            <bulbs-carousel-item id='anchored' href='#anchor'>
              <bulbs-video-summary></bulbs-video-summary>
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

  afterEach(() => {
    container.remove();
    window.location.hash = '';
  });

  describe('attachedCallback', () => {
    it('attaches firstPlay handler to videoPlayer', () => {
      subject.attachedCallback();
      expect(videoPlayer.addEventListener).to.have.been.calledWith(
        'jw-beforePlay',
        subject.firstPlay,
        true
      );
    });

    it('attaches playerEnded handler to videoPlayer', () => {
      subject.attachedCallback();
      expect(videoPlayer.addEventListener).to.have.been.calledWith(
        'jw-complete', subject.playerEnded, true
      );
    });

    it('attaches click handler to the carousel', () => {
      subject.attachedCallback();
      expect(carousel.addEventListener).to.have.been.calledWith(
        'click', subject.handleClick
      );
    });
  });

  describe('firstPlay', () => {

    it('selects the first item in the carousel', () => {
      sinon.spy(subject, 'selectItem');
      sinon.spy(subject, 'applyState');

      subject.firstPlay();

      expect(subject.selectItem).to.have.been.calledWith(firstItem);
      expect(subject.applyState).to.have.been.calledOnce;
    });

    it('removes itself', () => {

      subject.firstPlay();

      expect(videoPlayer.removeEventListener).to.have.been.calledWith(
        'jw-beforePlay',
        subject.firstPlay,
        true
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

  describe('selectItem', () => {
    it('adds a played class to item', () => {
      subject.selectItem(firstItem);
      expect(firstItem.classList.contains('played')).to.be.true;
    });

    it('sets an autoplay attribute on the video player', () => {
      expect(videoPlayer.getAttribute('autoplay')).to.be.null;
      subject.selectItem(secondItem);
      expect(videoPlayer.getAttribute('autoplay')).to.eql('');
    });

    it('selects the item', () => {
      sinon.spy(subject.state, 'selectItem');
      subject.selectItem(firstItem);
      expect(subject.state.selectItem).to.have.been.calledWith(firstItem);
    });
  });

  describe('handleClick', () => {
    context('item has an anchor tag', () => {
      it('updates history', () => {
        sinon.spy(window.history, 'pushState');
        let event = {
          target: anchoredItem,
          preventDefault: sinon.stub(),
        };
        subject.handleClick(event);

        expect(history.pushState).to.have.been.called;
      });
    });

    context('item does not have an anchor tag', () => {
      it('replaces the video in the carousel player', () => {
        sinon.stub(subject, 'selectItem');
        let event = {
          target: firstItem,
          preventDefault: sinon.stub(),
        };
        subject.handleClick(event);

        expect(event.preventDefault).to.have.been.called;
        expect(subject.selectItem).to.have.been.calledWith(firstItem);
      });
    });
  });

  describe('applyState', () => {
    beforeEach(() => sinon.spy(subject, 'doApplyState'));

    it('calls through to doApplyState', () => {
      expect(subject.doApplyState).not.to.have.been.called;
    });

    context('with no currentItem', () => {
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
        subject.state.selectItem(secondItem);
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
    });
  });

  describe('VideoCarouselState', () => {
    let currentItem;
    let summary;

    beforeEach(() => {
      currentItem = document.createElement('bulbs-carousel-item');
      summary = document.createElement('bulbs-video-summary');
      currentItem.appendChild(summary);
      subject = new VideoCarouselState({ currentItem });
    });

    describe('constructor', () => {
      context('with an invalid currentItem', () => {
        it('throws an error', () => {
          expect(() => new VideoCarouselState({ currentItem: 'bad' })).to.throw(
            /MUST have a <bulbs-video-summary> as a child element./
          );
        });
      });
    });

    describe('currentItem', () => {
      it('aliases to props', () => {
        subject.props.currentItem = 'currentItem';
        expect(subject.currentItem).to.eql('currentItem');
      });
    });

    describe('videoUrl', () => {
      it('reads from the currentItem src', () => {
        subject.props.currentItem = secondItem;
        expect(subject.videoUrl).to.eql('//example.org/video.json');
      });
    });

    describe('shareUrl', () => {
      it('reads from the currentItem share-url attribute', () => {
        subject.props.currentItem = secondItem;
        expect(subject.shareUrl).to.eql('//example.org/share-me');
      });
    });

    describe('shareTitle', () => {
      it('reads from the currentItem share-title attribute', () => {
        subject.props.currentItem = secondItem;
        expect(subject.shareTitle).to.eql('Rad Example Title!');
      });
    });

    describe('campaignUrl', () => {
      it('readys from the currentItem campaign-url attribute', () => {
        subject.props.currentItem = secondItem;
        expect(subject.campaignUrl).to.eql('//example.org/campaign');

      });
    });

    describe('selectItem', () => {
      it('selects the item', () => {
        subject.selectItem(secondItem);
        expect(subject.currentItem).to.eql(secondItem);
      });

      context('with an invalid video', () => {
        it('throws an error', () => {
          expect(() => subject.selectItem(document.createElement('bad-el'))).to.throw(
            /currentItem MUST have a <bulbs-video-summary> as a child element/
          );
        });
      });
    });
  });
});
