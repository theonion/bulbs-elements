import './carousel-item';

describe('<bulbs-video-carousel-item>', () => {
  let subject;
  let anchor;

  beforeEach(() => {
    let container = document.createElement('container');
    container.innerHTML = `
      <bulbs-video-carousel-item
        href="/path"
        data-track-action="action"
        data-track-category="category"
      >
        <cool-kid></cool-kid>
        <cool-kid></cool-kid>
      </bulbs-video-carousel-item>
    `;
    subject = container.querySelector('bulbs-video-carousel-item');
    anchor = subject.querySelector('a');
  });

  it('wraps the inner elements in an anchor', () => {
    expect(subject.childNodes.length).to.eql(1);
    expect(subject.childNodes[0]).to.eql(anchor);
    expect(anchor.querySelectorAll('cool-kid').length).to.eql(2);
  });

  it('copies data-track-action to the anchor', () => {
    expect(anchor.pathname).to.eql('/path');
  });

  it('copies data-track-category to the anchor', () => {
    expect(anchor.dataset.trackAction).to.eql('action');
  });

  it('copies href to the anchor', () => {
    expect(anchor.dataset.trackCategory).to.eql('category');
  });
});
