describe("Slideshow", function() {
  var Slideshow;
  var subject;
  var slideshowHtml = '<div class="slider"></div>'
  var slideshowElement;
  var $slider;

  beforeEach(function() {
    $('body').append(slideshowHtml);
    Slideshow = require('./slideshow');

    $slider = $('.slider');
    subject = new Slideshow($slider);
  });

  afterEach(function() {
    $slider.remove();
  });

  describe('new Slideshow', function() {
    beforeEach(function() {
      stub(Slideshow.prototype, 'init');
      subject = new Slideshow($slider);
    });

    it('has initial slide of 0', function() {
      expect(subject.initialSlide).to.equal(0);
    });

    it('inits the slider', function() {
      expect(Slideshow.prototype.init.called).to.be.true;
    });
  });

  describe('#init', function() {
    beforeEach(function() {
      spyOn($.fn, 'slick');
      subject.init();
    });

    it('inits the jQuery slick carousel with the correct stuff', function() {
      expect($.fn.slick.calledWith({
        infinite: false,
        arrows: false,
        dots: true,
        initialSlide: subject.initialSlide,
        appendDots: subject.navLinks,
        customPaging: subject.customPaging
      })).to.be.true;
    });
  });

  describe('#bodyKeyDown', function() {
    beforeEach(function() {
      stub(subject.slideshow, 'slick');
    });

    describe('clicked the left arrow', function() {
      beforeEach(function() {
        eventStub.keyCode = 37;
        subject.bodyKeyDown(eventStub);
      });

      it('tells slick to go to previous slide', function() {
        expect(subject.slideshow.slick.calledWith('slickPrev')).to.be.true;
      });
    });

    describe('clicked the right arrow', function() {
      beforeEach(function() {
        eventStub.keyCode = 39;
        subject.bodyKeyDown(eventStub);
      });

      it('tells slick to go to next slide', function() {
        expect(subject.slideshow.slick.calledWith('slickNext')).to.be.true;
      });
    });
  });
});