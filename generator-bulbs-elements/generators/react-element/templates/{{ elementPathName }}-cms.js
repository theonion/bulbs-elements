import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

class Embedded<%= elementClassName %> extends EmbededCMSElement {
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
