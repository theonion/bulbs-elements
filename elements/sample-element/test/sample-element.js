import { assert } from 'chai';

describe('SampleElement', function () {
  beforeEach(function () {
    let container = document.createElement('div');
    container.innerHTML = '<sample-element this-prop="HE Y"></sample-element>';
    this.element = container.querySelector('sample-element');
  });

  it('has a title', function () {
    let header = this.element.querySelector('h1');
    assert.equal(header.textContent, 'Check out this SICK example!');
  });

  it('has copy', function () {
    let graph = this.element.querySelector('p');
    assert.equal(graph.textContent, 'It is so effin SICK!');
  });
});
