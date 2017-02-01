import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';

import BulbsPollzoneCharter from './charter.js';
import BulbsPollzoneMap from './map.js';

import './bulbs-pollzone.scss';

export default class BulbsPollzone extends BulbsHTMLElement {
  attachedCallback () {
    let $element = $(this);
    new BulbsPollzoneMap($element[0], $item.find('.legend')[0], $this.data('map-data'));
  }
}

registerElement('bulbs-pollzone', loadOnDemand(BulbsPollzone));