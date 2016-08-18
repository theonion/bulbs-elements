import * as iphoneInlineVideo from 'iphone-inline-video';
import './bulbs-cinemagraph';

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
    // Can't actually spy on the export like this.
    // Any testing ideas welcome.
    xit('calls makeVideoPlayableInline', () => {
      let spy = sinon.spy(iphoneInlineVideo, 'default');
      subject.attachedCallback();
      expect(spy).to.have.been.called;
    });
  });
});
