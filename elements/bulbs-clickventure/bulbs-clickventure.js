import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import Clickventure from './clickventure';
import './bulbs-clickventure.scss';

function fireAnalytics () {
  if (ga) {
    let url = location.origin + location.pathname + location.search + location.hash;
    ga('send', 'pageview', { 'location': url });
    ga('adTracker.send', 'pageview', { 'location': url });
  }
}

function collapseResponsiveMenu () {
  $('.collapsynav').respMenuCollapse();
}

class BulbsClickventure extends BulbsHTMLElement {
  connectedCallback () {
    let $element = $(this);
    $element.data('clickventurePlugin', new Clickventure($element));
    $element.on('clickventure-page-change', fireAnalytics);
    $element.on('clickventure-page-change-complete', collapseResponsiveMenu);
    // new ClickventureManager('.clickventure-container');
  }
}

registerElement('bulbs-clickventure', BulbsClickventure);

export default BulbsClickventure;
