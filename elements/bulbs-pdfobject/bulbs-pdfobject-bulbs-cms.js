import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

import invariant from 'invariant';

import PDFObject from 'pdfobject/pdfobject';

class BulbsPDFObject extends BulbsHTMLElement {
  createdCallback () {
    invariant(this.hasAttribute, 'src');
    PDFObject.embed(this.getAttribute('src'), this);
  }
}

registerElement('bulbs-pdfobject', BulbsPDFObject);