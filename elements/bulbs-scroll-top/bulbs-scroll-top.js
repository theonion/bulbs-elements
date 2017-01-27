import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';

export default class ScrollTop extends BulbsHTMLElement {
  createdCallback () {
    invariant(this.getAttribute('duration') < 0,
      '<bulbs-scroll-top> MUST have a positive integer for duration');
  }

  attachedCallback () {
    this.step = this.step.bind(this);
    this.addEventListener('click', this.scrollToTop.bind(this));
  }

  setParams () {
    return {
      cosParameter: window.scrollY / 2,
      scrollCount: 0,
      oldTimestamp: window.performance.now(),
      duration:  this.getAttribute('duration') || 400,
    }
  }

  scrollToTop () {
    params = this.setParams(this)
    window.requestAnimationFrame((timestamp) => {
      this.step(timestamp, params)
    });

  }
  step (newTimestamp, params) {
    const timeDifference = newTimestamp - params.oldTimestamp;
    params.scrollCount = params.scrollCount + Math.PI / (params.duration / timeDifference);
    if (params.scrollCount >= Math.PI) {
      window.scrollTo(0, 0);
    }
    if (window.scrollY === 0) {
      return;
    }
    const moveStep = Math.round(2 * params.cosParameter * Math.cos(params.scrollCount));
    window.scrollTo(0, moveStep);
    params.oldTimestamp = newTimestamp;

    window.requestAnimationFrame((timestamp) => {
      this.step(timestamp, params)
    });
  }
}

registerElement('bulbs-scroll-top', ScrollTop);
