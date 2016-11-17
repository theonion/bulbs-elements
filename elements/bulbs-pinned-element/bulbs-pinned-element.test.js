import { BulbsPinnedElement } from './bulbs-pinned-element';

describe('<bulbs-pinned-element>', () => {
  let element;
  let parentElement;
  let subject;

  beforeEach(() => {
    element = document.createElement('bulbs-pinned-element');
    parentElement = document.createElement('parent-element');
    element.setAttribute('pinned-to', 'parent-element');
    parentElement.appendChild(element);
    document.body.append(parentElement);

    subject = parentElement.querySelector('bulbs-pinned-element');
  });

  afterEach(() => {
    parentElement.remove();
  });

  it('renders an <bulbs-pinned-element>', () => {
    expect(element.tagName.toLowerCase()).to.eql('bulbs-pinned-element');
  });

  context('#handleScrollDown', () => {
    let offset;
    let boundingRects;

    afterEach(() => {
      offset.restore();
    });

    it('adds pinned-top class while parent top is in viewport', () => {
      offset = sinon.stub($.fn, 'offset')
        .returns({ 'top': window.pageYOffset + 1 });
      subject.handleScrollDown(parentElement, {});
      expect(element.className).to.eql('pinned-top');
    });

    it('adds pinned-bottom class when element is at bottom of parent', () => {
      offset = sinon.stub($.fn, 'offset')
        .returns({ 'top': window.pageYOffset - 10 });
      boundingRects = {
        'pinnedElement': {'bottom': 10},
        'elementPinnedTo': {'bottom': 0 }
      };
      subject.handleScrollDown(parentElement, boundingRects);
      expect(element.className).to.eql('pinned-bottom');
    });

    it('adds pinned class if parent top not in viewport and element not at bottom', () => {
      offset = sinon.stub($.fn, 'offset')
        .returns({ 'top': window.pageYOffset - 10 });
      boundingRects = {
        'pinnedElement': {'bottom': 0},
        'elementPinnedTo': {'bottom': 10 }
      };
      subject.handleScrollDown(parentElement, boundingRects);
      expect(element.className).to.eql('pinned');
    });
  });

  context('#handleScrollUp', () => {
    let boundingRects = {
        'pinnedElement': {'top': -10},
        'elementPinnedTo': {'top': 0 }
      };

    it('adds pinned-top class when element reaches parent top', () => {
      subject.handleScrollUp(boundingRects);
      expect(element.className).to.eql('pinned-top');
    });

    it('adds pinned class if element below top of viewport', () => {
      boundingRects.elementPinnedTo.top = -12;
      subject.handleScrollUp(boundingRects);
      expect(element.className).to.eql('pinned');
    });
  });
});
