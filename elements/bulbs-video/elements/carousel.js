import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

export default class Carousel extends BulbsHTMLElement {
  getAnchors () {
    return this.querySelectorAll('bulbs-video-carousel-item a');
  }

  getActiveCarouselItem () {
    return this.querySelector(
      `bulbs-video-carousel-item[href='${window.location.pathname}']`
    );
  }

  createdCallback () {
    this.videoPlayer = this.querySelector('bulbs-video');
    this.playerEnded = this.playerEnded.bind(this);
  }

  attachedCallback () {
    if (this.videoPlayer) {
      // This event MUST pass false in as the third argument,
      //  video events do not bubble, so we have to listen to the
      //  catpure phase.
      this.videoPlayer.addEventListener('ended', this.playerEnded, true);
      if (this.getActiveCarouselItem()) {
        this.scrollPlayerIntoView();
      }
    }
  }

  detachedCallback () {
    if (this.videoPlayer) {
      this.videoPlayer.removeEventListener('ended', this.playerEnded);
    }
  }

  scrollPlayerIntoView () {
    this.videoPlayer.scrollIntoView();
    let header = document.body.querySelector('header');
    if (header) {
      window.scrollBy(0, header.getBoundingClientRect().height);
    }
  }

  playerEnded () {
    let items = this.getAnchors();
    let current = this.querySelector('bulbs-video-carousel-item[now-playing] a');
    let currentIndex = [].indexOf.call(items, current);
    let nextIndex = (currentIndex + 1) % (items.length - 1);
    let nextItem = items[nextIndex];
    nextItem.click();
  }
}

registerElement('bulbs-video-carousel', Carousel);
