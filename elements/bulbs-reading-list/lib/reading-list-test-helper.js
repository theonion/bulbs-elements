import '../bulbs-reading-list';
import '../../progress-bar/progress-bar';
import '../components/bulbs-reading-list-menu';
import '../components/bulbs-reading-list-articles';
import '../components/bulbs-reading-list-item';
import { times } from 'lodash';
import { createElement } from 'bulbs-elements/test/fixtures';

function createReadingListItems () {
  return times(4, (i) => {
    let id = i + 1;
    let item = createElement('bulbs-reading-list-item', {
      data: {
        id,
        href: `#example.com/test-article-${id}`,
        title: `Test Article ${id}`,
        partialUrl: `#example.com/test-article-${id}?partial=true`,
      },
    });
    let content = createElement('a', {
      href: '#',
      innerHTML: 'Article Stuff',
    });
    item.appendChild(content);
    return item;
  });
}

export default function buildReadingListFixture (attributes = {}) {
  let readingList = createElement('bulbs-reading-list', attributes);
  let readingListMenu = createElement('bulbs-reading-list-menu');
  let readingListArticles = createElement('bulbs-reading-list-articles');
  let menuItems = createReadingListItems();
  let articleItems = createReadingListItems();

  menuItems.forEach((item) => readingListMenu.appendChild(item));
  articleItems.forEach((item) => {
    item.appendChild(document.createElement('progress-bar'));
    readingListArticles.appendChild(item);
  });
  readingList.appendChild(readingListMenu);
  readingList.appendChild(readingListArticles);

  return readingList;
}
