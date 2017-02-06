import { BulbsSlickSlideshow } from './bulbs-slick-slideshow';  // eslint-disable-line no-unused-vars
import $ from 'jQuery';

describe('<bulbs-slick-slideshow>', function () {
  let parentElement;
  let subject;

  function attachSubject () {
    parentElement = document.createElement('parent-element');
    parentElement.appendChild(subject);

    subject.attachedCallback();
  }

  beforeEach(() => {
    subject = document.createElement('bulbs-slick-slideshow');
  });

  afterEach(() => {
    parentElement.remove();
  });

  it('renders a <bulbs-slick-slideshow>', function () {
    attachSubject();

    expect(subject.tagName.toLowerCase()).to.eql('bulbs-slick-slideshow');
  });

  describe('#init', function () {
    let navElement;

    beforeEach(function () {
      subject = document.createElement('bulbs-slick-slideshow');

      navElement = document.createElement('div');
      navElement.setAttribute('class', 'slider-nav');

      subject.appendChild(navElement);

      attachSubject();
      
      sinon.spy(subject.slideshow, 'slick');
    });

    it('inits the jQuery slick carousel with the correct stuff', function () {
      let { initialSlide } = subject;

      expect(subject.slideshow.slick).to.have.been.calledWith({
        infinite: false,
        arrows: false,
        dots: true,
        initialSlide: initialSlide,
        appendDots: navElement,
        customPaging: subject.customPaging,
      });
    });

    it('has initial slide of 0', function () {
      expect(subject.initialSlide).to.equal(0);
    });
  });

  describe('#bodyKeyDown', function () {
    let e = $.Event('keydown');

    beforeEach(function () {
      attachSubject();

      sinon.stub(subject.slideshow, 'slick');
    });

    describe('press left arrow', function () {
      beforeEach(function () {
        e.which = 37;
        $(subject).trigger(e);
      });

      it('tells slick to go to previous slide', function () {
        expect(subject.slideshow.slick.calledWith('slickPrev'));
      });
    });

    describe('press right arrow', function () {
      beforeEach(function () {
        e.which = 39;
        $(subject).trigger(e);
      });

      it('tells slick to go to next slide', function () {
        expect(subject.slideshow.slick.calledWith('slickNext'));
      });
    });
  });
});
