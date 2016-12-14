import { BulbsPinnedElement } from './bulbs-pinned-element';  // eslint-disable-line no-unused-vars
import createMockRaf from 'mock-raf';

describe('<bulbs-pinned-element>', () => {
  let childElement;
  let mockRaf = createMockRaf();
  let parentElement;
  let sandbox;
  let subject;

  function attachSubject () {
    parentElement = document.createElement('parent-element');

    parentElement.appendChild(subject);

    document.body.appendChild(parentElement);
  };

  beforeEach(done => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(window, 'requestAnimationFrame', mockRaf.raf);

    subject = document.createElement('bulbs-pinned-element');

    childElement = document.createElement('div');
    subject.appendChild(childElement);

    setImmediate(done);
  });

  afterEach(done => {
    parentElement.remove();

    sandbox.restore();
    setImmediate(done);
  });

  context('#initialization', () => {

    it('renders an <bulbs-pinned-element>', () => {

      attachSubject();

      expect(subject.tagName.toLowerCase()).to.eql('bulbs-pinned-element');
    });

    it('moves the content into a child component', () => {

      attachSubject();

      expect(Array.from(parentElement.querySelector('bulbs-pinned-element-car').children))
        .to.contain(childElement);
    });

    it('attaches positioning function to window scroll event', done => {
      let scrollEvent = new Event('scroll');
      sandbox.stub(subject, 'positionCar');
      attachSubject();

      window.dispatchEvent(scrollEvent);

      setImmediate(() => {
        expect(subject.positionCar).to.have.been.calledTwice;

        done();
      });
    });

    it('calls positioning function to ensure sidebar position is correct on load', () => {
      sandbox.stub(subject, 'positionCar');

      attachSubject();

      expect(subject.positionCar).to.have.been.calledOnce;
    });

    it('removes window scroll listener on unmount', () => {
      sandbox.spy(window, 'removeEventListener');
      attachSubject();

      subject.detachedCallback();

      expect(window.removeEventListener).to.have.been.calledWith('scroll', subject.boundPositionCar);
    });
  });

  context('initialized', () => {

    beforeEach(() => {
      attachSubject();
    });

    context('#positionCar', () => {

      beforeEach(() => {
        sandbox.stub(subject, 'handleScrollDown');
        sandbox.stub(subject, 'handleScrollUp');

        // make sure animation queue is empty
        mockRaf.cancel();
      });

      it('should call scroll down handler when scrolling down', done => {
        sandbox.stub(subject, 'isScrollingDown').returns(true);
        sandbox.stub(subject, 'isInView').returns(true);

        subject.positionCar.call(subject);
        mockRaf.step();

        setImmediate(() => {
          expect(subject.handleScrollDown).to.have.been.calledOnce;

          done();
        });
      });

      it('should not call scroll down handler when rail is not in view', done => {
        sandbox.stub(subject, 'isScrollingDown').returns(true);
        sandbox.stub(subject, 'isInView').returns(false);

        subject.positionCar.call(subject);
        mockRaf.step();

        setImmediate(() => {
          expect(subject.handleScrollDown).to.not.have.been.called;

          done();
        });
      });

      it('should call scroll up handler when scrolling up', done => {
        sandbox.stub(subject, 'isScrollingDown').returns(false);
        sandbox.stub(subject, 'isInView').returns(true);

        subject.positionCar.call(subject);
        mockRaf.step();

        setImmediate(() => {
          expect(subject.handleScrollUp).to.have.been.calledOnce;

          done();
        });
      });

      it('should not call scroll up handler when rail is not in view', done => {
        sandbox.stub(subject, 'isScrollingDown').returns(false);
        sandbox.stub(subject, 'isInView').returns(false);

        subject.positionCar.call(subject);
        mockRaf.step();

        setImmediate(() => {
          expect(subject.handleScrollUp).to.not.have.been.called;

          done();
        });
      });

      it('should ensure rail is the size of the parent less any start height offset', done => {
        let parentHeight = '100px';
        let parentWidth = '200px';
        parentElement.style.height = parentHeight;
        parentElement.style.width = parentWidth;
        parentElement.style.display = 'block';
        sandbox.stub(subject, 'isScrollingDown').returns(false);

        subject.positionCar.call(subject);
        mockRaf.step();

        setImmediate(() => {
          expect(subject.style.height).to.equal(parentHeight);
          expect(subject.style.width).to.equal(parentWidth);

          done();
        });
      });
    });

    context('#handleScrollDown', () => {

      it('pins car to bottom when car is at the bottom of the rail and removes other pinning classes', () => {
        let pos = 100;
        subject.car.classList.add('pinned');

        subject.handleScrollDown({
          car: { bottom: pos },
          rail: { bottom: pos }
        });

        let classes = Array.from(subject.car.classList);
        expect(classes).to.contain('pinned-bottom');
        expect(classes).to.not.contain('pinned');
        expect(subject.car.style.bottom).to.equal('0px');
        expect(subject.car.style.top).to.equal('initial');
      });

      it('pins car to window when car is not at the bottom of the rail and in full view adjusted by an offset', () => {
        let offset = 10;
        subject.topOffsetAdjustment = offset;

        subject.handleScrollDown({
          car: { bottom: 10 },
          rail: {
            bottom: 100,
            top: offset
          }
        });

        let classes = Array.from(subject.car.classList);
        expect(classes).to.contain('pinned');
        expect(classes).to.not.contain('pinned-bottom');
        expect(subject.car.style.top).to.equal(`${subject.topOffsetAdjustment}px`);
        expect(subject.car.style.bottom).to.equal('initial');
      });
    });

    context('#handleScrollUp', () => {

      it('pins car to top when car is at the top of the rail and removes other pinning classes', () => {
        let pos = 10;
        subject.car.classList.add('pinned', 'pinned-bottom');

        subject.handleScrollUp({
          car: { top: pos },
          rail: { top: pos }
        });

        let classes = Array.from(subject.car.classList);
        expect(classes).to.not.contain('pinned');
        expect(classes).to.not.contain('pinned-bottom');
        expect(subject.car.style.top).to.equal('0px');
        expect(subject.car.style.bottom).to.equal('initial');
      });

      it('pins car to window when car is not at the top of the rail and in full view adjusted by an offset', () => {
        subject.topOffsetAdjustment = 10;

        subject.handleScrollUp({
          car: {
            bottom: 90,
            height: 50,
          },
          rail: { bottom: 100 }
        });

        let classes = Array.from(subject.car.classList);
        expect(classes).to.contain('pinned');
        expect(classes).to.not.contain('pinned-bottom');
        expect(subject.car.style.top).to.equal(`${subject.topOffsetAdjustment}px`);
        expect(subject.car.style.bottom).to.equal('initial');
      });
    });
  });
});

