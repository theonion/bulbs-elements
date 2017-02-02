import { 
  BulbsHTMLElement, 
  registerElement 
} from 'bulbs-elements/register';
import BulbsPollzoneCharter from './bulbs-pollzone-charter.js';
import BulbsPollzoneMap from './bulbs-pollzone-map.js';
import './bulbs-pollzone.scss';

export default class BulbsPollzone extends BulbsHTMLElement {
  attachedCallback () {
    let $element = $(this);
    console.log(this);
    new BulbsPollzoneMap($element[0], $item.find('.legend')[0], $this.data('map-data'));
  }
}

registerElement('bulbs-pollzone', BulbsPollzone);
