import BulbsSlideshow from './bulbs-slideshow';  // eslint-disable-line no-unused-vars

describe('<bulbs-slideshow>', () => {
  let subject;
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    window.picturefill = sandbox.spy();
    fixture.load('bulbs-slideshow.html');
    subject = fixture.el.firstChild;
    setImmediate(() => done());
  });

  afterEach(() => {
    sandbox.restore();
    fixture.cleanup();
  });

  it('renders an <bulbs-slideshow>', () => {
    assert.equal(subject.tagName.toLowerCase(), 'bulbs-slideshow');
  });

  describe('render', () => {
    it('displays the current slide number', () => {
      sandbox.stub(subject, 'displayCurrentSlideNumber');
      subject.render();
      expect(subject.displayCurrentSlideNumber).to.have.been.called;
    });

    it('updates the navigation state', () => {
      sandbox.stub(subject, 'updateNavigationState');
      subject.render();
      expect(subject.updateNavigationState).to.have.been.called;
    });

    it('fills the pictures', () => {
      sandbox.stub(subject, 'fillPictures');
      subject.render();
      expect(subject.fillPictures).to.have.been.called;
    });
  });

  describe('displayCurrentSlideNumber', () => {
    it('renders the current slide and count', () => {
      sandbox.stub(subject, 'currentSlideNumber')
        .onFirstCall().returns(1)
        .onSecondCall().returns(2);

      subject.displayCurrentSlideNumber();
      expect(subject.$slideCount.eq(0).text()).to.equal('1 of 3');
      expect(subject.$slideCount.eq(1).text()).to.equal('1 of 3');

      subject.displayCurrentSlideNumber();
      expect(subject.$slideCount.eq(0).text()).to.equal('2 of 3');
      expect(subject.$slideCount.eq(1).text()).to.equal('2 of 3');
    });
  });

  describe('updateNavigationState', () => {
    let nextLinks;
    let prevLinks;

    beforeEach(() => {
      nextLinks = subject.$navigation.find('.next');
      prevLinks = subject.$navigation.find('.prev');
    });

    context('when on the last slide', () => {
      beforeEach(() => {
        sandbox.stub(subject, 'isOnLastSlide').returns(true);
        sandbox.stub(subject, 'isOnFirstSlide').returns(false);
      });

      it('disables the next links', () => {
        subject.updateNavigationState();
        nextLinks.each((_, element) => {
          expect($(element).hasClass('slides-disabled')).to.equal(true);
        });
      });

      it('does not disable the previous links', () => {
        prevLinks.addClass('slides-disabled');
        subject.updateNavigationState();
        prevLinks.each((_, element) => {
          expect($(element).hasClass('slides-disabled')).to.equal(false);
        });
      });
    });

    context('when on the first slide', () => {
      beforeEach(() => {
        sandbox.stub(subject, 'isOnLastSlide').returns(false);
        sandbox.stub(subject, 'isOnFirstSlide').returns(true);
      });

      it('disables the previous links', () => {
        subject.updateNavigationState();
        prevLinks.each((_, element) => {
          expect($(element).hasClass('slides-disabled')).to.equal(true);
        });
      });

      it('does not disable the next links', () => {
        nextLinks.addClass('slides-disabled');
        subject.updateNavigationState();
        nextLinks.each((_, element) => {
          expect($(element).hasClass('slides-disabled')).to.equal(false);
        });
      });
    });
  });

  describe('fillPictures', () => {
    it('uses the pictureFill method to fill slideshow images', () => {
      subject.fillPictures();
      expect(window.picturefill).to.have.been.calledWith('.slides li, .endcard .summary');
    });
  });
});
