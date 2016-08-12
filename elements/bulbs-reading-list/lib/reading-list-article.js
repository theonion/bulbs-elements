import ReadingListItem from './reading-list-item';
import { filterBadResponse, getResponseText } from 'bulbs-elements/util';

export default class ReadingListArticle extends ReadingListItem {
  constructor (element, position) {
    super(element, position);
    this.loadDistanceThreshold = 100;
  }

  loadContent () {
    console.log(getResponseText);
    fetch(this.href)
      .then(filterBadResponse)
      .then(getResponseText)
      .then(this.handleLoadContentComplete)
      .catch(this.handleLoadContentError);
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
  }

  handleLoadContentError (response) {
    throw new Error(`ReadingListArticle.loadContent(): fetch failed "${response.status} ${response.statusText}"`);
  }

  fillContent (content) {
    this.element.innerHTML = content;
  }

  isWithinLoadDistanceThreshold (scrollPosition) {
    let difference = this.element.offsetTop - scrollPosition;
    return difference <= this.loadDistanceThreshold;
  }
}
