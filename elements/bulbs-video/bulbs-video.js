import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-video.scss';

class BulbsVideo extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created bulbs-video');
  }

  attachedCallback () {
    console.log('Attached bulbs-video');
  }

  detachedCallback () {
    console.log('Detached bulbs-video');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed bulbs-video changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('bulbs-video', BulbsVideo);

export default BulbsVideo;
