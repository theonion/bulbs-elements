import 'console-shim';
import mapObject from 'object-map-to-array';
import TrackingPromise from './tracking-promise';

export default function testElement (title, testFunction) {
  describe(title, function () {
    beforeEach(function (beforeEachDone) {
      localStorage.clear();
      this.renderElement = function ({ tag, props, done }) {
        let propList = mapObject(props, (_, key) => `${key}='${props[key]}'`);
        this.container.innerHTML = `<${tag} ${propList.join(' ')}></${tag}>`;
        let element = this.container.querySelector(tag);
        setTimeout(function () {
          if (element.reactElement.store) {
            setImmediate(() => {
              TrackingPromise.awaitAll(done || function () {});
            });
          }
        }, 0);
        return element;
      };
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      setImmediate(() => beforeEachDone());
    });

    afterEach(function () {
      document.body.removeChild(this.container);
    });

    testFunction.call(this);
  });
}
