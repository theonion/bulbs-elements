import 'dom4';
import 'document-register-element';
import 'document-register-element/build/innerHTML';

// This is necessary for webkit compatibility
export function BaseElement () {}
BaseElement.prototype = HTMLElement.prototype;

export class EmbeddedCMSElement extends BaseElement {
  attachedCallback () {
    this.innerHTML = this.embedContentPreview;
  }

  filterForExport () {
    this.innerHTML = '';
  }
}

export class BulbsHTMLElement extends BaseElement {
  requireAttribute (attributeName) {
    invariant(this.hasAttribute(attributeName),
      `<${this.tagName.toLowerCase()}> MUST have a '${attributeName}' attribute.`);
  }
}

export function registerElement (tagName, ElementClass) {
  document.registerElement(tagName, ElementClass);
}
