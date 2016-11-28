import 'dom4';
import 'document-register-element';
import 'document-register-element/build/innerHTML';
import es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-fetch';
import 'ponyfill-array-find';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import invariant from 'invariant';
import ReactDOM from 'react-dom';
import React from 'react';
import camelcase from 'camelcase';

// This is necessary for webkit compatibility
function BaseElement () {}
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
      `<${this.tagName.toLowerCase()}> MUST have a '${attributeName}'  attribute.`);
  }
}

export function registerReactElement (tagName, ReactComponent) {
  class ReactWrapper extends BaseElement {
    /* Unmount me maybe.
      A note on the attachedCallback and detachedCallback lifecycle
      of this ReactWrapper.

      Consider this example:

      let element = document.createElement('custom-element');
      document.body.appendChild(element);
      document.body.removeChild(element);
      document.body.appendChild(element);

      If we immediately unmounted the React component, when the containing
      element is detached we would end up mounting the React component for
      this element twice.

      On detachment, we use setImmediate callback.
      If the element has a parent immediately following the detached callback
      we do not unmount the React component. If the element was truly removed
      from the document, we unmount the reactInstance and delete our cached
      reactInstance.

      In the attachment callback, if the cached reactInstance exists, we
      skip the rendering step.
    */
    attachedCallback () {
      if (!this.reactInstance) {
        this.doRender();
      }
    }

    detachedCallback () {
      // Unmount Me Maybe. See notes above.
      setImmediate(() => {
        if (!document.body.contains(this)) {
          this.unmountReactComponent();
        }
      });
    }

    attributeChangedCallback () {
      this.doRender();
    }

    doRender () {
      let renderableReactElement = React.createElement(
        ReactComponent,
        this.attributesHash
      );
      this.reactInstance = ReactDOM.render(
        renderableReactElement,
        this.mountPoint
      );
    }

    unmountReactComponent () {
      ReactDOM.unmountComponentAtNode(this.mountPoint);
      if (this.reactElement) {
        if (this.reactElement.store) {
          this.reactElement.store.unsubscribeComponent(this.reactElement);
        }
        delete this.reactElement;
      }
    }

    filterForExport () {
      this.unmountReactComponent();
      this.innerHTML = '';
    }

    get mountPoint () {
      return this;
    }

    get attributesHash () {
      let attributes = {};
      for (let index = 0; index < this.attributes.length; index = index + 1) {
        let attribute = this.attributes[index];
        let key = camelcase(attribute.name);
        attributes[key] = attribute.value;
      }
      return attributes;
    }
  }

  if (ReactComponent.extendDOM) {
    Object.assign(ReactWrapper.prototype, ReactComponent.extendDOM);
  }

  document.registerElement(tagName, ReactWrapper);
}

export function registerElement (tagName, ElementClass) {
  document.registerElement(tagName, ElementClass);
}
