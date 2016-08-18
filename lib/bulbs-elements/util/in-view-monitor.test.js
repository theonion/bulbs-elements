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
    el.style.position = 'fixed';
    el.style.height = '10px';
    el.style.width = '10px';
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
});
