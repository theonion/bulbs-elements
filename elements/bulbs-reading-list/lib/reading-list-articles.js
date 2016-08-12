/* eslint max-len: 0 */
import {
  map,
  minBy,
} from 'lodash';
import ReadingListArticle from './reading-list-article';
import ReadingListItems from './reading-list-items';

export default class ReadingListArticles extends ReadingListItems {
  constructor (element) {
    super(element);
    this.readingListItems = map(this.readingListItemElements, (el, i) => new ReadingListArticle(el, i));
    this.currentListItem = minBy(this.readingListItems, 'position');
  }
}
