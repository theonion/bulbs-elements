import iterateObject from '../util/iterate-object';

describe('iterateObject', () => {
  let subject;
  let iterator;
  beforeEach(() => {
    iterator = chai.spy(() => {});
    subject = {
      one: 1,
      two: 2,
    };
  });

  it('invokes iterator for each key in the object, passing the value of the key, and the key', () => {
    iterateObject(subject, iterator);
    expect(iterator).to.have.been.called.with(subject.one, 1);
    expect(iterator).to.have.been.called.with(subject.two, 2);
  });
});
