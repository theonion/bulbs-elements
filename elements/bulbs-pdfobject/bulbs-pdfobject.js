import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

import invariant from 'invariant';

import PDFObject from 'pdfobject/pdfobject';

class BulbsPDFObject extends BulbsHTMLElement {
  createdCallback () {
  	var poster = this.getAttribute('poster');
		var options = {
			fallbackLink: `<a href='[url]'><img src="${poster}"></a>`
		};
    invariant(this.hasAttribute('src'), '<bulbs-pdfobject> MUST have a \'src\' attribute');
    PDFObject.embed(this.getAttribute('src'), this, options);
  }
}

registerElement('bulbs-pdfobject', BulbsPDFObject);