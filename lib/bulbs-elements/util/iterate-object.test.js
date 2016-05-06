import iterateObject from './iterate-object';

describe('iterateObject', () => {
  let subject;
  let iterator;
  beforeEach(() => {
    iterator = sinon.spy();
    subject = {
      one: 1,
      two: 2,
    };
  });

  it('invokes iterator for each key in the object, passing the value of the key, and the key', () => {
    iterateObject(subject, iterator);
    expect(iterator).to.have.been.calledWith(subject.one, 'one');
    expect(iterator).to.have.been.calledWith(subject.two, 'two');
  });
});
