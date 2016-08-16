import './bulbs-reading-list';

describe('<bulbs-reading-list>', () => {
  let subject;

  beforeEach(() => {
    fixture.load('bulbs-reading-list.html');
    subject = fixture.el.firstChild;
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });
});
