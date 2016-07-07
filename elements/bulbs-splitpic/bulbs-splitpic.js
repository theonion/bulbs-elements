import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { SplitPic, SplitPicVertical } from './splitpic';
import './bulbs-splitpic.scss';

class BulbsSplitpic extends BulbsHTMLElement {
  attachedCallback () {
    console.log('Attached bulbs-splitpic');
    // $('.splitpic-horizontal .splitpic-images', elContent).each(function (i, v) {
    //   var sp = new SplitPic(v);
    // });

    // $('.splitpic-vertical .splitpic-images', elContent).each(function (i, v) {
    //   var sp = new SplitPicVertical(v);
    // });
  }
}

registerElement('bulbs-splitpic', BulbsSplitpic);

export default BulbsSplitpic;
