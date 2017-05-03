import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

let { forEach } = Array.prototype;

export class VideoCarouselState {
  constructor (props) {
    this.props = props;
    this.validate();
  }

  get currentItem () {
    return this.props.currentItem;
  }

  get videoUrl () {
    return this.currentItem.getAttribute('video-url') || '';
  }

  get campaignUrl () {
    return this.currentItem.getAttribute('campaign-url') || '';
  }

  get shareUrl () {
    return this.currentItem.getAttribute('share-url') || '';
  }

  get shareTitle () {
    return this.currentItem.getAttribute('share-title') || '';
  }

  selectItem (carouselItem) {
    this.props.currentItem = carouselItem;
    this.validate();
  }

  validate () {
    invariant(
      this.props.currentItem &&
      this.props.currentItem.querySelector &&
      this.props.currentItem.querySelector('bulbs-video-summary'),

      'VideoCarouselState currentItem MUST have a <bulbs-video-summary> as a child element.'
    );
  }
}

class BulbsVideoCarousel extends BulbsHTMLElement {
  get itemMatchingUrl () {
    return document.querySelector(`bulbs-carousel-item[href="${location.pathname}"]`);
  }

  attachedCallback () {
    invariant(
      this.videoPlayer = this.querySelector('bulbs-video'),
      '<bulbs-video-carousel> MUST contain a <bulbs-video>'
    );

    invariant(
      this.carousel = this.querySelector('bulbs-carousel'),
      '<bulbs-video-carousel> MUST contain a <bulbs-carousel>'
    );

    this.videoPlayer.addEventListener('jw-beforePlay', this.firstPlay = this.firstPlay.bind(this), true);
    this.videoPlayer.addEventListener('jw-complete', this.playerEnded = this.playerEnded.bind(this), true);
    this.carousel.addEventListener('click', this.handleClick = this.handleClick.bind(this));

    this.state = new VideoCarouselState({
      currentItem: this.itemMatchingUrl || document.querySelector('bulbs-carousel-item'),
    });
  }

  firstPlay () {
    this.videoPlayer.removeEventListener('jw-beforePlay', this.firstPlay, true);

    if (this.itemMatchingUrl) {
      this.selectItem(this.itemMatchingUrl);
      this.applyState();
    }
    else {
      let items = this.querySelectorAll('bulbs-carousel-item');

      if (items.length > 0) {
        this.selectItem(items[0]);
        this.applyState();
      }
    }
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
    this.videoPlayer.removeEventListener('jw-beforePlay', this.firstPlay, true);

    let item = event.target.closest('bulbs-carousel-item');
    if (item) {
      let anchor = item.querySelector('a');

      event.preventDefault();
      this.selectItem(item);
      this.applyState();

      if (anchor) {
        history.pushState({}, '', anchor.href);
      }
    }
  }

  selectItem (itemElement) {
    // Setting autoplay here causes the video to play immediately when it is selected
    // on the next line.
    this.videoPlayer.setAttribute('autoplay', '');
    this.state.selectItem(itemElement);
    itemElement.classList.add('played');
  }

  applyState () {
    if (this.state.currentItem) {
      this.doApplyState();
    }
  }

  doApplyState () {
    forEach.call(
      this.querySelectorAll('[now-playing]'),
      (nowPlaying) => nowPlaying.removeAttribute('now-playing')
    );

    this.state.currentItem.setAttribute('now-playing', '');
    this.state.currentItem.querySelector('bulbs-video-summary').setAttribute('now-playing', '');

    forEach.call(
      this.querySelectorAll('bulbs-video-meta, bulbs-video'),
      (element) => element.setAttribute('src', this.state.videoUrl)
    );

    forEach.call(
      this.querySelectorAll('bulbs-video-meta'),
      (element) => element.setAttribute('campaign-url', this.state.campaignUrl)
    );

    forEach.call(
      this.querySelectorAll('share-tools, bulbs-video'),
      (element) => element.setAttribute('share-url', this.state.shareUrl)
    );

    forEach.call(
      this.querySelectorAll('share-tools'),
      (element) => element.setAttribute('share-title', this.state.shareTitle)
    );
  }
}

registerElement('bulbs-video-carousel', BulbsVideoCarousel);
