import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

class EmbeddedCampaignDisplay extends EmbededCMSElement {
  get embedContentPreview () {
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-puzzle-piece'></i>
        Embedded CampaignDisplay
      </h1>
    `;
  }
}

registerElement('campaign-display', EmbeddedCampaignDisplay);
