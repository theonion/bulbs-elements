import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './progress-bar.scss';

function invertProgress (progress) {
  return 100 - progress;
}

class ProgressBar extends BulbsHTMLElement {
  connectedCallback () {
    let progress = parseInt(this.getAttribute('progress'), 10) || 0;
    this.innerHTML = `<div class="progress-track" style="width: ${invertProgress(progress)}%"></div>`;
  }

  attributeChangedCallback (name, previousValue, value) {
    if (name === 'progress' && this.children.length) {
      this.querySelector('.progress-track').style.width = `${invertProgress(value)}%`;
    }
  }
}

registerElement('progress-bar', ProgressBar);

export default ProgressBar;
