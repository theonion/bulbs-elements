import {
  registerReactElement,
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

import './share-tools.scss';

export default class ShareTools extends BulbsHTMLElement {
  attributeChangedCallback () {
    // <share-via-email> doesn't update properly when <share-tools> props update.
    // <share-via-twitter> and <share-via-facebook> open up pop-ups with window.open
    // and read the share properties just in time.
    // On mobile, the email mailto href must be constructed ahead of time,
    // So we have to manually kick off the react life cycle again.
    // This might not be the best way to do it. But it should work.
    let viaEmail = this.querySelector('share-via-email');
    if (viaEmail) {
      viaEmail.reactInstance.componentDidMount();
    }
  }
}

registerElement('share-tools', ShareTools);

import ShareViaFacebook from './components/via-facebook';
import ShareViaTwitter from './components/via-twitter';
import ShareViaEmail from './components/via-email';
import CommentViaDisqus from './components/via-disqus';

registerReactElement('share-via-facebook', ShareViaFacebook);
registerReactElement('share-via-twitter', ShareViaTwitter);
registerReactElement('share-via-email', ShareViaEmail);
registerReactElement('share-via-disqus', CommentViaDisqus);
