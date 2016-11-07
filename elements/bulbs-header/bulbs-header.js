import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-header-masthead';
import './bulbs-header-responsive-nav';
import './bulbs-header.scss';
import '../bulbs-flyover-menu/bulbs-flyover-menu';

class BulbsHeader extends BulbsHTMLElement {
  createdCallback () {
    this.mastheads = this.getElementsByTagName('bulbs-header-masthead');
    this.responsiveNavs = this.getElementsByTagName('bulbs-header-responsive-nav');
  }

  attachedCallback () {
    this.addEventListener(
      'exitviewport',
      this.delegateEnterViewport.bind(this),
      true
    );   

   this.addEventListener(
      'enterviewport',
      this.delegateExitViewport.bind(this),
      true
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
    this.responsiveNavs[0];
  }
}

registerElement('bulbs-header', BulbsHeader);

export default BulbsHeader;