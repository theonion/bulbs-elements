import {
  registerReactElement,
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

import './share-tools.scss';

export default class ShareTools extends BulbsHTMLElement {}

registerElement('share-tools', ShareTools);

import ShareViaFacebook from './components/via-facebook';
import ShareViaTwitter from './components/via-twitter';
import ShareViaEmail from './components/via-email';

registerReactElement('share-via-facebook', ShareViaFacebook);
registerReactElement('share-via-twitter', ShareViaTwitter);
registerReactElement('share-via-email', ShareViaEmail);
