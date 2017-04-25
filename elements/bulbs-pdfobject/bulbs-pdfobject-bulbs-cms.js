import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register';

class BulbsPDFObject extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <object data="${this.getAttribute('src')}" type="application/pdf" width="100%" height="100%">
    `;
  }
}

registerElement('bulbs-pdfobject', BulbsPDFObject);

