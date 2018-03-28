import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import { inIframe, resizeParentFrame } from 'bulbs-elements/util';
import Clickventure from './clickventure';
import './bulbs-clickventure.scss';

function sendPageLoadEvent () {
  if (ga) {
    ga('send', 'event', {
      eventCategory: 'Article: Clickventure',
      eventAction: 'Page Load',
      eventLabel: '#',
    });
  }
}

function fireAnalytics () {
  if (ga) {
    let url = location.origin + location.pathname + location.search + location.hash;
    ga('send', 'pageview', { 'location': url });
  }
}

class BulbsClickventure extends BulbsHTMLElement {
  attachedCallback () {
    let $element = $(this);
    $element.data('clickventurePlugin', new Clickventure($element));

    if (inIframe()) {
      sendPageLoadEvent();
    }
    else {
      $element.on('clickventure-page-change', fireAnalytics);
    }

    // Embedded CVs can resize their parent frame
    resizeParentFrame();
  }
}

registerElement('bulbs-clickventure', BulbsClickventure);

export default BulbsClickventure;
