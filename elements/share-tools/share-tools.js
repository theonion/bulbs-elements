import {
  registerReactElement,
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

import './share-tools.scss';

export default class ShareTools extends BulbsHTMLElement {
  attributeChangedCallback () {
    // <share-via-email> doesn't update properly when <share-tools> props update.
    // We have to manually update it.
    let viaEmail = this.querySelector('share-via-email');
    if (viaEmail) {
      viaEmail.reactElement.setEmailUrl(this.props.shareTitle, this.props.shareUrl);
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
