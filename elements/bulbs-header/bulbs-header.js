import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-header-masthead';
import './bulbs-header-responsive-nav';
import './bulbs-header.scss';

class BulbsHeader extends BulbsHTMLElement {
  createdCallback () {
    this.mastheads = this.getElementsByTagName('bulbs-header-masthead');
    this.responsiveNavs = this.getElementsByTagName('bulbs-header-responsive-nav');
  }

  attachedCallback () {
    this.masthead.addEventListener(
      'exitviewport',
      this.delegateExitViewport.bind(this)
    );

    this.masthead.addEventListener(
      'enterviewport',
      this.delegateEnterViewport.bind(this)
    );

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

  get masthead () {
    return this.mastheads[0];
  }

  get responsiveNav () {
    return this.responsiveNavs[0];
  }
}

registerElement('bulbs-header', BulbsHeader);

export default BulbsHeader;