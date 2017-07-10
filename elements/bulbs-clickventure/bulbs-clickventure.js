import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register-element';
import Clickventure from './clickventure';
import './bulbs-clickventure.scss';

function fireAnalytics () {
  if (ga) {
    let url = location.origin + location.pathname + location.search + location.hash;
    ga('send', 'pageview', { 'location': url });
    ga('adTracker.send', 'pageview', { 'location': url });
  }
}

class BulbsClickventure extends BulbsHTMLElement {
  attachedCallback () {
    let $element = $(this);
    $element.data('clickventurePlugin', new Clickventure($element));
    $element.on('clickventure-page-change', fireAnalytics);
  }
}

registerElement('bulbs-clickventure', BulbsClickventure);

export default BulbsClickventure;
