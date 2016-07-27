import React from 'react';
import loadOnDemand from './load-on-demand';
import { registerReactElement } from '../register';

registerReactElement(
  'div-on-demand',
  loadOnDemand(() => <div className='on-demand'/>)
);

describe('loadOnDemand', () => {
  let container;
  let onDemand = document.getElementsByClassName('on-demand');

  context('element is within viewing zone', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      container.innerHTML = `
        <div-on-demand></div-on-demand>
      `;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.remove();
    });

    it('loads immediately', () => {
      expect(onDemand.length).to.eql(1);
    });

  });

  context('element moves into viewing zone', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      container.innerHTML = `
        <div
          style="
            margin-top: 200%
          "
        >
          <div-on-demand></div-on-demand>
        </div>
      `;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.remove();
    });

    it('loads on scroll', (done) => {
      container.firstElementChild.style.marginTop = 'auto';
      window.dispatchEvent(new Event('scroll'));
      requestAnimationFrame(() => {
        expect(onDemand.length).to.eql(1);
        done();
      });
    });

    it('loads on resize', (done) => {
      container.firstElementChild.style.marginTop = 'auto';
      window.dispatchEvent(new Event('resize'));
      requestAnimationFrame(() => {
        expect(onDemand.length).to.eql(1);
        done();
      });
    });
  });

  context('element is not within viewing zone', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      container.innerHTML = `
        <div
          style="
            margin-top: 200%
          "
        >
          <div-on-demand></div-on-demand>
        </div>
      `;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.remove();
    });

    it('does not load immediately', () => {
      expect(onDemand.length).to.eql(0);
    });

    it('does not load on scroll', () => {
      expect(onDemand.length).to.eql(0);
    });

    it('does not load on resize', () => {
      expect(onDemand.length).to.eql(0);
    });
  });
});
