/* eslint-disable no-return-assign */
import InViewMonitor from './in-view-monitor';

function emitWindowEvent (eventName) {
  try {
    window.dispatchEvent(new Event(eventName));
  }
  catch (error) {
    const event = document.createEvent('Event');
    event.initEvent(eventName, false, true);
    window.dispatchEvent(event);
  }
}
describe('InViewMonitor', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.height = '10px';
    el.style.width = '10px';
    el.style.top = '0px';
    el.style.left = '0px';
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  describe('add', () => {
    it('emits enterviewport event if element already in viewport', () => {
      let spy = sinon.spy();
      el.addEventListener('enterviewport', spy);
      InViewMonitor.add(el);
      expect(spy).to.have.been.called.once;
    });

    it('does not emit enterviewport event if element not in viewport', () => {
      let spy = sinon.spy();
      el.addEventListener('enterviewport', spy);
      el.style.top = '200%';
      InViewMonitor.add(el);
      expect(spy).not.to.have.been.called.once;
    });

    it('emits enterviewport event on scroll', (done) => {
      let spy = sinon.spy();
      el.addEventListener('enterviewport', spy);
      el.style.top = '200%';
      InViewMonitor.add(el);
      el.style.top = '0';
      requestAnimationFrame(() => {
        emitWindowEvent('scroll');
        requestAnimationFrame(() => {
          emitWindowEvent('scroll');
          requestAnimationFrame(() => {
            expect(spy).to.have.been.called.once;
            done();
          });
        });
      });
    });

    it('emits exitviewport event on scroll', (done) => {
      let spy = sinon.spy();
      el.addEventListener('exitviewport', spy);
      el.style.top = '0';
      InViewMonitor.add(el);
      el.style.top = '200%';
      requestAnimationFrame(() => {
        emitWindowEvent('scroll');
        requestAnimationFrame(() => {
          emitWindowEvent('scroll');
          requestAnimationFrame(() => {
            expect(spy).to.have.been.called.once;
            done();
          });
        });
      });
    });

    it('emits enterviewport event on resize', (done) => {
      let spy = sinon.spy();
      el.addEventListener('enterviewport', spy);
      el.style.top = '200%';
      InViewMonitor.add(el);
      el.style.top = '0';
      requestAnimationFrame(() => {
        emitWindowEvent('resize');
        requestAnimationFrame(() => {
          emitWindowEvent('resize');
          requestAnimationFrame(() => {
            expect(spy).to.have.been.called.once;
            done();
          });
        });
      });
    });

    it('emits exitviewport event on resize', (done) => {
      let spy = sinon.spy();
      el.addEventListener('exitviewport', spy);
      el.style.top = '0';
      InViewMonitor.add(el);
      el.style.top = '200%';
      requestAnimationFrame(() => {
        emitWindowEvent('resize');
        requestAnimationFrame(() => {
          emitWindowEvent('resize');
          requestAnimationFrame(() => {
            expect(spy).to.have.been.called.once;
            done();
          });
        });
      });
    });
  });

  describe('distanceFromTop', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy();
    });

    it('calls calculated options on every check', () => {
      InViewMonitor.add(el, {
        get distanceFromTop () {
          spy();
          return 0;
        },
      });

      InViewMonitor.checkElement(el);

      expect(spy).to.have.been.called.twice;
    });

    it('emits enterviewport when item is within distance from top', () => {
      el.addEventListener('enterviewport', spy);
      el.style.top = '40px';
      InViewMonitor.add(el, {
        distanceFromTop: 50,
      });

      expect(spy).to.not.have.been.called;
      el.style.top = '51px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits enterviewport when item is within distance from top (negative distance)', () => {
      el.addEventListener('enterviewport', spy);
      el.style.top = '-60px';
      InViewMonitor.add(el, {
        distanceFromTop: -50,
      });
      expect(spy).not.to.have.been.called.once;

      el.style.top = '-59px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits exitviewport when item is within distance from top', () => {
      el.addEventListener('exitviewport', spy);
      el.style.top = '51px';
      InViewMonitor.add(el, {
        distanceFromTop: 50,
      });

      expect(spy).to.not.have.been.called;
      el.style.top = '40px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits exitviewport when item is within distance from top (negative distance)', () => {
      el.addEventListener('exitviewport', spy);
      el.style.top = '-59px';
      InViewMonitor.add(el, {
        distanceFromTop: -50,
      });
      expect(spy).not.to.have.been.called.once;

      el.style.top = '-60px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('progress events', () => {
    let spy;
    beforeEach(() => spy = sinon.spy());
    it('emits progresschange events when the page scrolls', (done) => {
      el.style.top = '0px';
      InViewMonitor.add(el);
      el.addEventListener('progresschange', (event) => {
        expect(event.detail.percent).to.eql(50);
        done();
      });
      el.style.top = '-5px';
      InViewMonitor.checkElement(el);
    });

    it('emits pagestart event when page starts from top', () => {
      el.style.top = '-10px';
      InViewMonitor.add(el);
      el.addEventListener('pagestart', spy);
      el.style.top = '-5px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits pagestart event when page starts from bottom', () => {
      el.style.top = '10px';
      InViewMonitor.add(el);
      el.addEventListener('pagestart', spy);
      el.style.top = '9px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits pagend event when page ends from top', () => {
      el.style.top = '-5px';
      InViewMonitor.add(el);
      el.addEventListener('pageend', spy);
      el.style.top = '-10px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits pageend event when page ends from bottom', () => {
      el.style.top = '9px';
      InViewMonitor.add(el);
      el.addEventListener('pageend', spy);
      el.style.top = '10px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('distanceFromBottom', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy();
    });

    it('calls calculated options on every check', () => {
      InViewMonitor.add(el, {
        get distanceFromBottom () {
          spy();
          return 0;
        },
      });

      InViewMonitor.checkElement(el);

      expect(spy).to.have.been.called.twice;
    });

    it('emits enterviewport when item is within distance from bottom', () => {
      el.addEventListener('enterviewport', spy);
      el.style.top = window.innerHeight + 50 + 'px';
      InViewMonitor.add(el, {
        distanceFromBottom: 50,
      });

      expect(spy).to.not.have.been.called;
      el.style.top = window.innerHeight + 49 + 'px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits enterviewport when item is within distance from bottom (negative distance)', () => {
      el.addEventListener('enterviewport', spy);
      el.style.top = window.innerHeight - 50 + 'px';
      InViewMonitor.add(el, {
        distanceFromBottom: -50,
      });
      expect(spy).not.to.have.been.called.once;

      el.style.top = window.innerHeight - 51 + 'px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits exitviewport when item is within distance from bottom', () => {
      el.addEventListener('exitviewport', spy);
      el.style.top = window.innerHeight + 49 + 'px';
      InViewMonitor.add(el, {
        distanceFromBottom: 50,
      });

      expect(spy).to.not.have.been.called;
      el.style.top = window.innerHeight + 50 + 'px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });

    it('emits exitviewport when item is within distance from bottom (negative distance)', () => {
      el.addEventListener('exitviewport', spy);
      el.style.top = window.innerHeight - 51 + 'px';
      InViewMonitor.add(el, {
        // This test is a getter to prove this works with getters
        get distanceFromBottom () { return -50; },
      });
      expect(spy).not.to.have.been.called.once;

      el.style.top = window.innerHeight - 50 + 'px';
      InViewMonitor.checkElement(el);
      expect(spy).to.have.been.called.once;
    });
  });
});
