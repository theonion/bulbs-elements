import './bulbs-ellipsize';

describe('bulbs-ellipsize', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('bulbs-ellipsize');
    element.setAttribute('line-count', 2);
    element.innerHTML = `
      this is a really really long string it goes on for
      a long ass time, just keeps going. It will stop
      eventually, but not until the end of this line
    `;
  });
  afterEach(() => {
    element.remove();
  });

  it('requires a line-count attribute on element', () => {
    element.removeAttribute('line-count');
    setImmediate(() => {
      expect(() => {
        document.body.appendChild(element)
      }).to.throw('BulbsEllipsize: Expects a line-count attribute')
    });
  });

  it('it truncates multi-line text', () => {
    let expected = 'this is a really really long st...';
    element.style.width = '100px';
    element.style.display = 'block';
    element.style.lineHeight = '10px';
    setImmediate(() => {
      document.body.appendChild(element)
    });
    expect(element.textContent).to.eql(expected);
  });
});
