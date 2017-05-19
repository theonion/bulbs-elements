import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

import { InViewMonitor } from 'bulbs-elements/util';

import invariant from 'invariant';

import PDFObject from 'pdfobject/pdfobject';

class BulbsPDFObject extends BulbsHTMLElement {

  attachedCallback () {
    invariant(this.hasAttribute('poster'), '<bulbs-pdfobject> MUST have a \'poster\' attribute');
    invariant(this.hasAttribute('src'), '<bulbs-pdfobject> MUST have a \'src\' attribute');
    this.addEventListener('enterviewport', this.embedPDF.bind(this));
    InViewMonitor.add(this);
  }

  embedPDF () {
    let poster = this.getAttribute('poster');
    let options = {
      fallbackLink: `<a href='[url]' data-track-action="Embed Fallback" data-track-label='[url]'><div class="fallback-btn">Tap to explore document</div><img src="${poster}"></a>`,
    };
    PDFObject.embed(this.getAttribute('src'), this, options);
    InViewMonitor.remove(this);
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }

}

registerElement('bulbs-pdfobject', BulbsPDFObject);

