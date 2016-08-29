import { registerElement } from 'bulbs-elements/register';
import { InViewMonitor } from 'bulbs-elements/util';
import * as iphoneInlineVideo from 'iphone-inline-video';
import './bulbs-cinemagraph.scss';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLVideoElement () {}
BulbsHTMLVideoElement.prototype = HTMLVideoElement.prototype;

class BulbsCinemagraph extends BulbsHTMLVideoElement {
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
    this.setAttribute('webkit-playsinline', true);

    this.addEventListener('enterviewport', () => this.play());
    this.addEventListener('exitviewport', () => this.pause());
  }

  attachedCallback () {
    iphoneInlineVideo.default(this, /* hasAudio */ false);
    InViewMonitor.add(this);
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }
}

BulbsCinemagraph.extends = 'video';

registerElement('bulbs-cinemagraph', BulbsCinemagraph);
