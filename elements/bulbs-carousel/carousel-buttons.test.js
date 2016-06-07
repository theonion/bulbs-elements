import './carousel-buttons';
let subject;
let carousel;
let container;

function carouselButtonExamples() {
  describe('createdCallback', () => {
    it('sets innerHTML', () => {
      expect(subject.innerHTML).to.eql(subject.contentHTML);
    });
  });

  describe('attachedCallback', () => {
    it('listens to the <bulbs-carousel> slide-items event', () => {
      sinon.stub(subject, 'checkBounds');
      subject.attachedCallback();
      let event = new CustomEvent('slide-items', {
        detail: {
          carouselItems: [],
        },
      });
      carousel.dispatchEvent(event);
      expect(subject.checkBounds).to.have.been.calledWith(event);
    });
  });

  describe('checkbounds', () => {
    context('outOfBounds is true', () => {
      it('sets the disabled attribute', () => {
        subject.outOfBounds = () => true;
        subject.checkBounds(new CustomEvent('slide-items'));
        expect(subject.getAttribute('disabled')).to.eql('');
      });
    });

    context('outOfBounds is false', () => {
      it('removes the disabled attribute', () => {
        subject.outOfBounds = () => false;
        subject.checkBounds(new CustomEvent('slide-items'));
        expect(subject.getAttribute('disabled')).to.eql(null); // eslint-disable-line no-undefined
      });
    });
  });
}

describe('<bulbs-carousel-next>', () => {
  beforeEach((done) => {
    container = document.createElement('container');
    container.innerHTML = `
      <bulbs-carousel>
        <bulbs-carousel-next></bulbs-carousel-next>
      </bulbs-carousel>
    `;
    subject = container.querySelector('bulbs-carousel-next');
    carousel = container.querySelector('bulbs-carousel');
    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  carouselButtonExamples.call(this);

  describe('outOfBounds', () => {
    context('at beginning of last page', () => {
      it('is true', () => {
        expect(subject.outOfBounds({
          currentIndex: 5,
          perPage: 5,
          carouselItems: { length: 10 },
        })).to.be.true;
      });
    });

    context('somewhere in last page', () => {
      it('is true', () => {
        expect(subject.outOfBounds({
          currentIndex: 8,
          perPage: 5,
          carouselItems: { length: 10 },
        })).to.be.true;
      });
    });

    context('before last page', () => {
      it('is not true', () => {
        expect(subject.outOfBounds({
          currentIndex: 0,
          perPage: 5,
          carouselItems: { length: 10 },
        })).not.to.be.true;
      });
    });
  });
});

describe('<bulbs-carousel-previous>', () => {
  beforeEach((done) => {
    container = document.createElement('container');
    container.innerHTML = `
      <bulbs-carousel>
        <bulbs-carousel-previous></bulbs-carousel-previous>
      </bulbs-carousel>
    `;
    subject = container.querySelector('bulbs-carousel-previous');
    carousel = container.querySelector('bulbs-carousel');
    document.body.appendChild(container);
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  carouselButtonExamples.call(this);

  describe('outOfBounds', () => {
    context('page is first page', () => {
      it('is true', () => {
        expect(subject.outOfBounds({ currentIndex: 0 })).to.be.true;
      });
    });

    context('currentIndex is not 0', () => {
      it('page is not first page', () => {
        expect(subject.outOfBounds({ currentIndex: 10 })).to.be.false;
      });
    });
  });
});
