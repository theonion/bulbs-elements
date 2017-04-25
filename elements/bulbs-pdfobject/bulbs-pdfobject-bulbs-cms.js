import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

import invariant from 'invariant';

import PDFObject from 'pdfobject/pdfobject';

class BulbsPDFObject extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <object data="${this.getAttribute('src')}" type="application/pdf" width="100%" height="100%">
    `;
  }
}

registerElement('bulbs-pdfobject', BulbsPDFObject);

