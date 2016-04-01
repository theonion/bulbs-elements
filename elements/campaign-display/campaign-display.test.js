import { assert } from 'chai';
import testElement from 'bulbs-elements/test/element';

testElement('<campaign-display>', function () {
  beforeEach(function (done) {
    this.element = this.renderElement({
      done,
      tag: 'campaign-display',
      props: {
        // src: '/whatever.json',
      },
    });

    this.actions = this.element.reactElement.store.actions;
  });

  it('renders an <campaign-display>', function () {
    assert.equal(this.element.tagName.toLowerCase(), 'campaign-display');
  });
});
