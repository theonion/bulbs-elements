import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import testElement from 'bulbs-elements/test/element';

testElement('<sample-element>', function () {
  beforeEach(function (done) {
    this.element = this.renderElement({
      done,
      tag: 'sample-element',
      props: {
        // src: '/whatever.json',
      }
    });

    this.actions = this.element.reactElement.store.actions;
  });

  it('renders an <sample-element>', function () {
    assert.equal(this.element.tagName.toLowerCase(), 'sample-element');
  });
});
