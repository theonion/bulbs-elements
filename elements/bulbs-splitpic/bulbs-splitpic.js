import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { SplitPic, SplitPicVertical } from './splitpic';
import invariant from 'invariant';
import './bulbs-splitpic.scss';

class BulbsSplitpic extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.attributes.orientation.value, 'BulbsSplitpic: orientation attribute is required');
    this.orientation = this.attributes.orientation.value;

    if (this.attributes['bs-right-image']) {
      this.setImageSrc(this.attributes['bs-right-image'].value, 'right');
    }

    if (this.attributes['bs-left-image']) {
      this.setImageSrc(this.attributes['bs-left-image'].value, 'left');
    }

    if (this.attributes['bs-image-size']) {
      this.setImageSize(this.attributes['bs-image-size'].value);
    }

    if (this.attributes['bs-start-percent']) {
      this.setStartPercent(this.attributes['bs-start-percent'].value);
    }

    if (this.orientation === 'horizontal') {
      this.splitPic = new SplitPic(this);
    }

    if (this.orientation === 'vertical') {
      this.splitPic = new SplitPicVertical(this);
    }
  }

  setImageSize (size) {
    const $element = $(this);

    let $imageContainer = $element.find('.splitpic-images');
    $imageContainer.addClass(`size-${size}`);
  }

  setStartPercent (percent) {
    const $element = $(this);
    let $imageContainer = $element.find('.splitpic-images');

    $imageContainer.data('start-percent', percent);
  }

  setImageSrc (imageUrl, direction) {
    let $element = $(this);
    let imgNode = $element.find(`.splitpic-${direction}-image img`)[0];

    imgNode.src = imageUrl;
    imgNode.dataSrc = imageUrl;
    imgNode.class = "cld-responsive";
  }
}

registerElement('bulbs-splitpic', BulbsSplitpic);

export default BulbsSplitpic;
