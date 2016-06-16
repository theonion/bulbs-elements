import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

class VideoCarouselState {
  constructor (props) {
    this.props = props;
    this.validate();
  }

  get currentVideo () {
    return this.props.currentVideo;
  }

  selectVideo (videoSummary) {
    this.props.currentVideo = videoSummary;
    this.validate();
  }

  validate () {
    invariant(
      this.props.currentVideo && this.props.currentVideo.matches('bulbs-video-summary'),
      'VideoCarouselState MUST have a <bulbs-video-summary> as currentVideo prop.'
    );
  }
}

class BulbsVideoCarousel extends BulbsHTMLElement {
  attachedCallback () {
    invariant(
      this.videoPlayer = this.querySelector('bulbs-video'),
      '<bulbs-video-carousel> MUST contain a <bulbs-video>'
    );

    invariant(
      this.carousel = this.querySelector('bulbs-carousel'),
      '<bulbs-video-carousel> MUST contain a <bulbs-carousel>'
    );

    this.videoPlayer.addEventListener('ended', this.playerEnded.bind(this), true);
    this.carousel.addEventListener('click', this.handleClick.bind(this));

    this.state = new VideoCarouselState({
      currentVideo: this.querySelector('bulbs-video-summary'),
    });
  }

  playerEnded () {
    let items = this.querySelectorAll('bulbs-carousel-item');
    let current = this.querySelector('bulbs-carousel-item[now-playing]');
    let currentIndex = [].indexOf.call(items, current);
    let nextIndex = (currentIndex + 1) % (items.length);
    if (currentIndex !== nextIndex) {
      let nextItem = items[nextIndex];
      nextItem.click();
    }
  }

  handleClick (event) {
    let summary = event.target.closest('bulbs-carousel-item bulbs-video-summary');
    if (summary) {
      event.preventDefault();
      this.videoPlayer.setAttribute('autoplay', true);
      this.state.selectVideo(summary);
    }

    this.applyState();
  }

  applyState () {
    if (this.state.currentVideo) {
      Array.prototype.forEach.call(
        this.querySelectorAll('[now-playing]'),
        (nowPlaying) => {
          nowPlaying.removeAttribute('now-playing');
        }
      );

      this.state.currentVideo.setAttribute('now-playing', true);
      this.state.currentVideo.closest('bulbs-carousel-item').setAttribute('now-playing', true);

      Array.prototype.forEach.call(
        this.querySelectorAll('bulbs-video-meta, bulbs-video'),
        (element) => {
          element.setAttribute('src', this.state.currentVideo.getAttribute('src'));
        }
      );
    }
  }
}

registerElement('bulbs-video-carousel', BulbsVideoCarousel);
