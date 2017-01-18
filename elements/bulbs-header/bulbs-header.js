import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-header-masthead';
import './bulbs-header-responsive-nav';
import './bulbs-header.scss';

import { InViewMonitor } from 'bulbs-elements/util';

class BulbsHeader extends BulbsHTMLElement {

  connectedCallback () {

    this.masthead = this.querySelector('bulbs-header-masthead');
    this.responsiveNav = this.querySelector('bulbs-header-responsive-nav');

    if (this.masthead) {

      if (!InViewMonitor.isElementInViewport(this.masthead)) {
        this.responsiveNav.classList.add('responsive-nav-active');
      }

      this.masthead.addEventListener(
        'exitviewport',
        this.delegateExitViewport.bind(this)
      );

      this.masthead.addEventListener(
        'enterviewport',
        this.delegateEnterViewport.bind(this)
      );
    }

    if (this.responsiveNav && ! this.masthead) {
      this.responsiveNav.classList.add('responsive-nav-active');
    }
  }

  delegateEnterViewport (event) {
    if (event.target === this.masthead) {
      if (this.responsiveNav) {
        this.responsiveNav.classList.remove('responsive-nav-active');
      }
    }
  }

  delegateExitViewport (event) {
    if (event.target === this.masthead) {
      if (this.responsiveNav) {
        this.responsiveNav.classList.add('responsive-nav-active');
      }
    }
  }

}

registerElement('bulbs-header', BulbsHeader);

export default BulbsHeader;
