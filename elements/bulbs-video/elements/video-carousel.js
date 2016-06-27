import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

export class VideoCarouselState {
  constructor (props) {
    this.props = props;
    this.validate();
  }

  get currentVideo () {
    return this.props.currentVideo;
  }

  get carouselItem () {
    return this.currentVideo.closest('bulbs-carousel-item');
  }

  get videoUrl () {
    return this.carouselItem.getAttribute('src');
  }

  get shareUrl () {
    return this.carouselItem.getAttribute('share-url');
  }

  selectVideo (videoSummary) {
    this.props.currentVideo = videoSummary;
    this.validate();
  }

  validate () {
    let { currentVideo } = this.props;
    invariant(
      currentVideo && currentVideo.matches && currentVideo.matches('bulbs-video-summary'),
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

    this.videoPlayer.addEventListener('ended', this.playerEnded = this.playerEnded.bind(this), true);
    this.carousel.addEventListener('click', this.handleClick = this.handleClick.bind(this));

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
      nextItem.children[0].click();
    }
  }

  handleClick (event) {
    let item = event.target.closest('bulbs-carousel-item');
    let summary;
    if (item) {
      summary = item.querySelector('bulbs-carousel-item > bulbs-video-summary');
    }
    if (summary) {
      event.preventDefault();
      this.selectVideo(summary);
      this.applyState();
    }
  }

  selectVideo (summaryElement) {
    this.videoPlayer.setAttribute('autoplay', '');
    this.state.selectVideo(summaryElement);
    summaryElement.closest('bulbs-carousel-item').classList.add('played');
  }

  applyState () {
    if (this.state.currentVideo) {
      this.doApplyState();
    }
  }

  doApplyState () {
    Array.prototype.forEach.call(
      this.querySelectorAll('[now-playing]'),
      (nowPlaying) => nowPlaying.removeAttribute('now-playing')
    );

    this.state.currentVideo.setAttribute('now-playing', '');
    this.state.currentVideo.closest('bulbs-carousel-item').setAttribute('now-playing', '');

    Array.prototype.forEach.call(
      this.querySelectorAll('bulbs-video-meta'),
      (element) => element.setAttribute('share-url', this.state.shareUrl)
    );

    Array.prototype.forEach.call(
      this.querySelectorAll('bulbs-video-meta, bulbs-video'),
      (element) => element.setAttribute('src', this.state.videoUrl)
    );
  }
}

registerElement('bulbs-video-carousel', BulbsVideoCarousel);
