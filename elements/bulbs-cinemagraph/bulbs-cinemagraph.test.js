describe('<video is="bulbs-cinemagraph">', () => {
  let subject;

  beforeEach(() => {
    subject = document.createElement('video', 'bulbs-cinemagraph');
  });

  it('sets the loop attribute', () => {
    expect(subject.getAttribute('loop')).to.eql('true');
  });

  it('sets the autoplay attribute', () => {
    expect(subject.getAttribute('autoplay')).to.eql('true');
  });

  it('sets the webkit-playsinline attribute', () => {
    expect(subject.getAttribute('webkit-playsinline')).to.eql('true');
  });

  it('overrides the video duration', () => {
    subject.setAttribute('cinemagraph-duration', '4.55');
    expect(subject.duration).to.eql(4.55);
  });

  describe('attachedCallback', () => {
    // Not sure how to assert the makeVideoPlayableInline function was called.
  });
});
