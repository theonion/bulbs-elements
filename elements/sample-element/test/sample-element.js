import { assert } from 'chai';

describe('SampleElement', function () {
  beforeEach(function (done) {
    this.container = document.createElement('div');
    this.container.innerHTML = '<sample-element this-prop="HEY"></sample-element>';
    this.element = this.container.querySelector('sample-element');
    document.body.appendChild(this.container);
    requestAnimationFrame(function () {
      done();
    });
  });

  afterEach(function () {
    document.body.removeChild(this.container);
  });

  it('has a title', function () {
    let header = this.element.querySelector('h1');
    assert.equal(header.textContent, 'Check out this SICK example!');
  });

  it('has copy', function () {
    let graph = this.element.querySelector('p');
    assert.equal(graph.textContent, 'It is so effin SICK!');
  });

  it('passes props straight through', function () {
    let propText = this.element.querySelector('.prop-text');
    assert.equal(propText.textContent, 'HEY');
  });
});
