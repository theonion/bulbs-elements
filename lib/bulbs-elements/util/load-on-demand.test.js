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
        <div-on-demand
          style="
            position: absolute;
            top: 0px;
            left: 0px;
            display: block;
            width: 10px;
            height: 10px;
          "
        >
        </div-on-demand>
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
        <div-on-demand
          style="
            position: absolute;
            top: 200%;
            left: 0px;
            display: block;
            width: 10px;
            height: 10px;
          "
        >
        </div-on-demand>
      `;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    afterEach(() => {
      container.remove();
    });

    it('loads on scroll', (done) => {
      container.firstElementChild.style.top = '0px';
      try {
        window.dispatchEvent(new Event('scroll'));
      }
      catch (error) {
        const event = document.createEvent('Event');
        event.initEvent('scroll', false, true);
        window.dispatchEvent(event);
      }
      requestAnimationFrame(() => {
        expect(onDemand.length).to.eql(1);
        done();
      });
    });

    it('loads on resize', (done) => {
      container.firstElementChild.style.top = '0px';
      try {
        window.dispatchEvent(new Event('resize'));
      }
      catch (error) {
        const event = document.createEvent('Event');
        event.initEvent('resize', false, true);
        window.dispatchEvent(event);
      }
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
        <div-on-demand
          style="
            position: absolute;
            top: 200%;
            left: 0px;
            display: block;
            width: 10px;
            height: 10px;
          "
        >
        </div-on-demand>
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

  context('element is given a disable-lazy-loading attribute', () => {

    beforeEach((done) => {
      container = document.createElement('div');
      container.innerHTML = `
        <div-on-demand
          style="
            position: absolute;
            top: 200%;
            left: 0px;
            display: block;
            width: 10px;
            height: 10px;
          "
          disable-lazy-loading
        >
        </div-on-demand>
      `;
      document.body.appendChild(container);
      setImmediate(() => done());
    });

    it('loads immediately', () => {
      expect(onDemand.length).to.equal(1);
    });
  });
});
