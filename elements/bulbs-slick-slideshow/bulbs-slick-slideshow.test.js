import { BulbsSlickSlideshow } from './bulbs-slick-slideshow';  // eslint-disable-line no-unused-vars

describe('<bulbs-slick-slideshow>', () => {
  let otherSubject;
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

  it('renders a <bulbs-slick-slideshow>', () => {
    attachSubject();

    expect(subject.tagName.toLowerCase()).to.eql('bulbs-slick-slideshow');
  });

  describe('#init', () => {
    let navLinks;
    let otherSlider;
    let slider;

    beforeEach(() => {
      subject = document.createElement('bulbs-slick-slideshow');
      slider = document.createElement('div');
      slider.setAttribute('class', 'slider');
      navLinks = document.createElement('div');
      navLinks.setAttribute('class', 'slider-nav');

      slider.appendChild(navLinks);
      subject.appendChild(slider);

      otherSubject = document.createElement('bulbs-slick-slideshow');
      otherSlider = slider.cloneNode(true);
      otherSubject.appendChild(otherSlider);

      attachSubject();

    });

    it('inits the jQuery slick carousel with the correct stuff', () => {
      sinon.spy(subject.slideshow, 'slick');

      subject.init();

      expect(subject.slideshow.slick).to.have.been.calledWith({
        infinite: false,
        arrows: false,
        dots: true,
        initialSlide: 0,
        appendDots: subject.navLinks,
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
    let e = $.Event('keydown');  // eslint-disable-line babel/new-cap

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
