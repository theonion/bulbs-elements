import {
  BulbsHTMLElement,
  registerElement
} from 'bulbs-elements/register';

class BulbsArticleBody extends BulbsHTMLElement {

  addDingbat () {
    let $lastElement = $(this).find('> :last-child');
    let dingbat = '<span class="site-dingbat"></span>';

    if (!$lastElement.text()) {
      $lastElement = $lastElement.prev();
    }

    if ($lastElement.is('ul')) {
      // appends to this > ul > li:last-child
      $lastElement.children('li:last-child').append(dingbat);
    } else if ($lastElement.is('div')) {
      if ($lastElement.find('> :last-child').is('p')) {
        // appends to this > div > p:last-child
        $lastElement.find('> :last-child').append(dingbat);
      } else {
        // appends to this > div:last-child
        $lastElement.append(dingbat);
      }
    } else if ($lastElement.is('p')) {
      // Handle extraneous br tags
      if($lastElement.children('br').length) {
        // targets this > p:last-child > before br:last-child
        $lastElement.children('br:last-child').before(dingbat);
      } else {
        // targets this > p:last-child
        $lastElement.append(dingbat);
      }
    }
  }

  attachedCallback () {
    this.addDingbat();
  }
}

BulbsArticleBody.extends = 'div';

registerElement('bulbs-article-body', BulbsArticleBody);
