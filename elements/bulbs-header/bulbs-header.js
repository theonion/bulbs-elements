import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import './bulbs-header-masthead';
import './bulbs-header-responsive-nav';
import './bulbs-header.scss';

import { InViewMonitor } from 'bulbs-elements/util';

class BulbsHeader extends BulbsHTMLElement {

  attachedCallback () {

    this.masthead = this.querySelector('bulbs-header-masthead');
    this.responsiveNav = this.querySelector('bulbs-header-responsive-nav');

    if (this.masthead) {

      if (!InViewMonitor.isElementInViewport(this.masthead)) {
        this.signifyResponsiveNavActive();
      }
      else {
        this.signifyMastheadActive();
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
      this.signifyResponsiveNavActive();
    }
  }

  delegateEnterViewport (event) {
    if (event.target === this.masthead) {
      this.signifyMastheadActive();
    }
  }

  delegateExitViewport (event) {
    if (event.target === this.masthead) {
      this.signifyResponsiveNavActive();
    }
  }

  signifyResponsiveNavActive () {
    if (this.responsiveNav) {
      this.responsiveNav.classList.add('responsive-nav-active');
    }
    this.classList.add('responsive-nav-active');
    this.classList.remove('masthead-active');
  }

  signifyMastheadActive () {
    if (this.responsiveNav) {
      this.responsiveNav.classList.remove('responsive-nav-active');
    }
    this.classList.remove('responsive-nav-active');
    this.classList.add('masthead-active');
  }
}

registerElement('bulbs-header', BulbsHeader);

export default BulbsHeader;
