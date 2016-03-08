import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './onion-video.scss';

class OnionVideo extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created onion-video');
  }

  attachedCallback () {
    console.log('Attached onion-video');
  }

  detachedCallback () {
    console.log('Detached onion-video');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed onion-video changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('onion-video', OnionVideo);

export default OnionVideo;
