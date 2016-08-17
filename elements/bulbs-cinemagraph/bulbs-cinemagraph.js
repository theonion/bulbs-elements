import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import makeVideoPlayableInline from 'iphone-inline-video';
import './bulbs-cinemagraph.scss';
// Usage:
// <video src="/path/to/cinemagraph.mp4" is="bulbs-cinemagraph">

class BulbsCinemagraph extends BulbsHTMLElement {
  createdCallback () {
    if (!this.hasAttribute('cinemagraph-duration')) {
      console.warn('is="bulbs-cinemagraph" elements should have a [cinemagraph-duration] attribute set');
    }

    // makeVideoPlayableInline is dumb and goes just a little bit too far in the
    // video, this results in a quick flash of a black frame in the loop. If we
    // override the duration we can get the loop to loop properly.
    // For now, this must be determined by hand.
    Object.defineProperty(this, 'duration', {
      get () {
        return parseFloat(this.getAttribute('cinemagraph-duration')) || 0;
      },
    });

    this.setAttribute('loop', true);
    this.setAttribute('autoplay', true);
    this.setAttribute('webkit-playsinline', true);
  }

  attachedCallback () {
    makeVideoPlayableInline(this, /* hasAudio */ false);
  }
}

BulbsCinemagraph.extends = 'video';

registerElement('bulbs-cinemagraph', BulbsCinemagraph);
