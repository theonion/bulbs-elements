import {
  registerElement,
  EmbeddedCMSElement,
} from 'bulbs-elements/register-element';

class Embedded<%= elementClassName %> extends EmbeddedCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded <%= elementClassName %>
      </h1>
    `;
  }
}

registerElement('<%= elementName %>', Embedded<%= elementClassName %>);
