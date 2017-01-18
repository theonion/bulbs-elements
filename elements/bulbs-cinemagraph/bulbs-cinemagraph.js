import { registerElement } from 'bulbs-elements/register';
import { InViewMonitor } from 'bulbs-elements/util';
import * as iphoneInlineVideo from 'iphone-inline-video';
import './bulbs-cinemagraph.scss';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLVideoElement () {}
BulbsHTMLVideoElement.prototype = HTMLVideoElement.prototype;

class BulbsCinemagraph extends BulbsHTMLVideoElement {
  get duration () {
    return parseFloat(this.getAttribute('cinemagraph-duration') || 0);
  }

  connectedCallback () {
    if (!this.hasAttribute('cinemagraph-duration')) {
      console.warn('is="bulbs-cinemagraph" elements should have a [cinemagraph-duration] attribute set');
    }

    this.setAttribute('loop', true);
    this.setAttribute('webkit-playsinline', true);

    this.addEventListener('enterviewport', () => this.play());
    this.addEventListener('exitviewport', () => this.pause());

    iphoneInlineVideo.default(this, /* hasAudio */ false);
    InViewMonitor.add(this);
  }

  disconnectedCallback () {
    InViewMonitor.remove(this);
  }
}

registerElement('bulbs-cinemagraph', BulbsCinemagraph, { extends: 'video' });
