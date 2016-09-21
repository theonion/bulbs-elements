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

  it('it truncates multi-line text', () => {
    element.style.width = '100px';
    element.style.display = 'block';
    element.style.lineHeight = '10px';
    document.body.appendChild(element)
    element.attachedCallback();
    expect(element.clientHeight).to.eql(20)
  });
});
