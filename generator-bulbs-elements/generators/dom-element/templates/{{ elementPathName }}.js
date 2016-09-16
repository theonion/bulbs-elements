import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './<%= elementPathName %>.scss';

export default class <%= elementClassName %> extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created <%= elementName %>');
  }

  attachedCallback () {
    console.log('Attached <%= elementName %>');
  }

  detachedCallback () {
    console.log('Detached <%= elementName %>');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed <%= elementName %> changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('<%= elementName %>', <%= elementClassName %>);
