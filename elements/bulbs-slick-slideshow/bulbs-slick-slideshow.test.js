import { BulbsSlickSlideshow } from './bulbs-slick-slideshow';  // eslint-disable-line no-unused-vars

describe('<bulbs-slick-slideshow>', () => {
  let subject;

  beforeEach(() => {
    subject = document.createElement('bulbs-slick-slideshow');
  });

  afterEach(() => {
    subject.remove();
  });

  it('renders a <bulbs-slick-slideshow>', () => {
    subject.attachedCallback();

    expect(subject.tagName.toLowerCase()).to.eql('bulbs-slick-slideshow');
  });

  describe('#init', () => {
    let slider;
    let slideOne;
    let slideTwo;
    let sliderNav;

    beforeEach(() => {
      subject = document.createElement('bulbs-slick-slideshow');

      slider = document.createElement('div');
      slider.setAttribute('class', 'slider');

      slideOne = document.createElement('div');
      slideOne.setAttribute('class', 'slide');
      slideTwo = document.createElement('div');
      slideTwo.setAttribute('class', 'slide');

      sliderNav = document.createElement('div');
      sliderNav.setAttribute('class', 'slider-nav');

      subject.appendChild(slideOne);
      subject.appendChild(slideTwo);
      subject.appendChild(slider);
      subject.appendChild(sliderNav);

      subject.attachedCallback();

      sinon.spy(subject.slideshow, 'slick');


      subject.init();
    });

    it('inits the jQuery slick carousel with the correct stuff', () => {
      expect(subject.slideshow.slick).to.have.been.calledWith({
        infinite: false,
        arrows: false,
        dots: true,
        initialSlide: 0,
        appendDots: subject.sliderNav,
        customPaging: subject.customPaging,
      });
    });

    it('has initial slide of 0', () => {
      expect(subject.initialSlide).to.equal(0);
    });
  });

  describe('#bodyKeyDown', () => {
    let e = $.Event('keydown');

    beforeEach(() => {
      subject.attachedCallback();

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
