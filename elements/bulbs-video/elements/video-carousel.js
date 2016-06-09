import invariant from 'invariant';
import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

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

    this.videoPlayer.addEventListener('ended', this.playerEnded, true);
  }

  detachedCallback () {
    this.videoPlayer.removeEventListener('ended', this.playerEnded);
  }

  getAnchors () {
    return this.querySelectorAll('bulbs-carousel-item a');
  }

  playerEnded () {
    let items = this.getAnchors();
    let current = this.querySelector('bulbs-carousel-item[now-playing] a');
    let currentIndex = [].indexOf.call(items, current);
    let nextIndex = (currentIndex + 1) % (items.length);
    if (currentIndex !== nextIndex) {
      let nextItem = items[nextIndex];
      nextItem.click();
    }
  }
}

registerElement('bulbs-video-carousel', BulbsVideoCarousel);
