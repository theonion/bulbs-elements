import './bulbs-ellipsize';

describe('bulbs-ellipsize', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('bulbs-ellipsize');
    element.setAttribute('length', 0);
    element.setAttribute('line-count', 2);
    element.setAttribute('text',  `
    this is a really really long string it goes on for
    a long ass time, just keeps going. It will stop
    eventually, but not until the end of this line
    `);
  });
  afterEach(() => {
    element.remove();
  });

  it('requires a text attribute on element', () => {
    element.removeAttribute('text');
    setImmediate(() => {
      expect(() => {
        document.body.appendChild(element)
      }).to.throw('BulbsEllipsize: Expects a text attribute')
    });
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
    document.body.appendChild(element);
    element.style.width = '100px';
    element.style.height = '100px';
    element.fontSize = '10px';
  });
});
