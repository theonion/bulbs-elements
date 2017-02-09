import { BulbsSlickSlideshow } from './bulbs-slick-slideshow';  // eslint-disable-line no-unused-vars

describe('<bulbs-slick-slideshow>', () => {
  let otherSubject;
  let parentElement;
  let subject;

  function attachSubject () {
    parentElement = document.createElement('parent-element');
    parentElement.appendChild(subject);
    document.body.appendChild(parentElement);
  }

  beforeEach(() => {
    subject = document.createElement('bulbs-slick-slideshow');
  });

  afterEach(() => {
    parentElement.remove();
  });

  it('renders a <bulbs-slick-slideshow>', () => {
    attachSubject();

    expect(subject.tagName.toLowerCase()).to.eql('bulbs-slick-slideshow');
  });

  describe('#init', () => {
    let slider;
    let slide;
    let sliderNav;
    let otherSlider;

    beforeEach(() => {
      subject = document.createElement('bulbs-slick-slideshow');
      slider = document.createElement('div');
      slide = document.createElement('div');
      sliderNav = document.createElement('div');
      slider.setAttribute('class', 'slider');
      sliderNav.setAttribute('class', 'slider-nav');

      slider.appendChild(slide);
      subject.appendChild(slider);
      subject.appendChild(sliderNav);

      otherSubject = document.createElement('bulbs-slick-slideshow');
      otherSlider = slider.cloneNode(true);
      otherSubject.appendChild(otherSlider);

      attachSubject();
    });

    it('initializes the carousel with appropriate options', () => {
      sinon.spy(subject.slideshow, 'slick');

      subject.init();

      expect(subject.slideshow.slick).to.have.been.calledWith({
        infinite: false,
        arrows: false,
        dots: true,
        initialSlide: 0,
        appendDots: $('slider-nav'),
        customPaging: subject.customPaging,
      });
    });

    it('does not init other carousels on page', () => {
      expect(otherSubject.slideshow).to.be.undefined;
    });

    it('has initial slide of 0', () => {
      expect(subject.initialSlide).to.equal(0);
    });
  });

  describe('#bodyKeyDown', () => {
    let e = $.Event('keydown');

    beforeEach(() => {
      attachSubject();

      sinon.stub(subject.slideshow, 'slick');
    });

    describe('in viewport', () => {
      beforeEach(() => {
        sinon.stub(subject, 'isInViewport').returns(true);
      });

      describe('press left arrow', () => {
        beforeEach(() => {
          e.which = 37;
          $(subject).trigger(e);
        });

        it('tells slick to go to previous slide', () => {
          expect(subject.slideshow.slick.calledWith('slickPrev'));
        });
      });

      describe('press right arrow', () => {
        beforeEach(() => {
          e.which = 39;
          $(subject).trigger(e);
        });

        it('tells slick to go to next slide', () => {
          expect(subject.slideshow.slick.calledWith('slickNext'));
        });
      });
    });

    describe('not in viewport', () => {
      beforeEach(() => {
        sinon.stub(subject, 'isInViewport').returns(false);
      });

      describe('press left arrow', () => {
        beforeEach(() => {
          e.which = 37;
          $(subject).trigger(e);
        });

        it('tells slick to go to previous slide', () => {
          expect(subject.slideshow.slick).to.not.have.been.calledWith('slickPrev');
        });
      });

      describe('press right arrow', () => {
        beforeEach(() => {
          e.which = 39;
          $(subject).trigger(e);
        });

        it('tells slick to go to next slide', () => {
          expect(subject.slideshow.slick).to.not.have.been.calledWith('slickNext');
        });
      });
    });
  });
});
