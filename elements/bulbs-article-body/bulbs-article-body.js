import {
  BulbsHTMLElement,
  registerElement
} from 'bulbs-elements/register';

class BulbsArticleBody extends BulbsHTMLElement {

  addDingbat () {
    let $lastElement = $(this).find('> :last-child');
    let dingbat = '<span class="site-dingbat"></span>';

    if (!$lastElement.text()) {
      $lastElement.prev();
    }

    if ($lastElement.is('ul')) {
      // appends to .article-text > ul > li:last-child
      $lastElement.children('li:last-child').append(dingbat);
    } else if ($lastElement.is('div')) {
      if ($lastElement.find('> :last-child').is('p')) {
        // appends to .article-text > div > p:last-child
        $lastElement.find('> :last-child').append(dingbat);
      } else {
        // appends to .article-text > div:last-child
        $lastElement.append(dingbat);
      }
    } else if ($lastElement.is('p')) {
      // Handle extraneous br tags
      if($lastElement.children('br').length) {
        // targets .article-text > p:last-child > before br:last-child
        $lastElement.children('br:last-child').before(dingbat);
      } else {
        // targets .article-text > p:last-child
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
