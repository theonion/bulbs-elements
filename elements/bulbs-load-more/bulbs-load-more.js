import { filterBadResponse } from 'bulbs-elements/util';
import { registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLButtonElement () {}
BulbsHTMLButtonElement.prototype = HTMLButtonElement.prototype;

class LoadMore extends BulbsHTMLButtonElement {
  createdCallback () {
    invariant(this.hasAttribute('src'),
      '<button is="bulbs-load-more"> MUST have a `src` attribute;');
  }

  attachedCallback () {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick () {
    fetch(this.getAttribute('src'), { credentials: 'include' })
      .then(filterBadResponse)
      .then((response) => response.text())
      .then(this.handleFetchSuccess.bind(this))
      .catch(this.handleFetchError.bind(this))
    ;
  }

  handleFetchSuccess (htmlText) {
    this.outerHTML = htmlText;
  }

  handleFetchError () {
    this.outerHTML = '<span>There was an error fetching more content. Please reload page and try again.</span>';
  }
}

LoadMore.extends = 'button';

registerElement('bulbs-load-more', LoadMore);
