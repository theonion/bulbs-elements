import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import { SplitPic, SplitPicVertical } from './splitpic';
import invariant from 'invariant';
import './bulbs-splitpic.scss';

class BulbsSplitpic extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.attributes.orientation.value, 'BulbsSplitpic: orientation attribute is required');
    this.orientation = this.attributes.orientation.value;

    if (this.orientation === 'horizontal') {
      this.splitPic = new SplitPic(this);
    }

    if (this.orientation === 'vertical') {
      this.splitPic = new SplitPicVertical(this);
    }
  }
}

registerElement('bulbs-splitpic', BulbsSplitpic);

export default BulbsSplitpic;
