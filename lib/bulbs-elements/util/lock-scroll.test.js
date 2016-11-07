/* eslint-disable no-return-assign */

import LockScroll from './lock-scroll';
import Human from './human';
import scrollingElement from './scrolling-element';

describe('LockScroll', () => {
  let sandbox;
  let element;
  let spacer;
  let offset;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.spy(LockScroll, 'animationLoop');

    element = document.createElement('div');
    element.style.height = '400px';
    document.body.prepend(element);

    spacer = document.createElement('div');
    spacer.style.height = '400px';
    document.body.prepend(spacer);

    document.body.style.height = '4000px';

    offset = document.createElement('div');
    offset.setAttribute('id', 'offset');
    offset.style.height = '50px';
    document.body.append(offset);
  });

  afterEach(() => {
    sandbox.restore();
    LockScroll.resetState();
    element.remove();
    spacer.remove();
    offset.remove();
    document.body.style.height = '';
  });

  context('Human.hasInteracted is true', () => {
    beforeEach(() => Human.hasInteracted = true);

    it('does nothing', () => {
      expect(LockScroll.animationLoop).not.to.have.been.called;
    });
  });

  context('Human.hasInteracted is false', () => {
    beforeEach(() => Human.hasInteracted = false);

    it('sets scrollingElement.scrollTop to element.offsetTop', () => {
      let animationFrameRequested = LockScroll.animationLoop(element);
      cancelAnimationFrame(animationFrameRequested);
      expect(scrollingElement.scrollTop).to.eql(400);
    });

    it('adds an offset based on a scroll-offset-selector attribute', () => {
      element.setAttribute('scroll-offset-selector', '#offset');
      let animationFrameRequested = LockScroll.animationLoop(element);
      cancelAnimationFrame(animationFrameRequested);
      expect(scrollingElement.scrollTop).to.eql(450);
    });
  });
});
