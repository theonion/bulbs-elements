/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import ReadingListArticles from './reading-list-items';

describe('ReadingListArticles', () => {
  let subject;
  let element;

  beforeEach(() => {
    fixture.load('reading-list-items.html');
    element = fixture.el.firstChild;
    subject = new ReadingListArticles(element);
  });

  it('exists', () => {
    expect(subject).to.exist;
  });
});
