import { InViewMonitor } from 'bulbs-elements/util';
import './bulbs-cinemagraph';
import * as iphoneInlineVideo from 'iphone-inline-video';

describe('<video is="bulbs-cinemagraph">', () => {
  let subject;

  beforeEach((done) => {
    subject = document.createElement('video', 'bulbs-cinemagraph');
    document.body.appendChild(subject);
    sinon.spy(InViewMonitor, 'add');
    sinon.spy(InViewMonitor, 'remove');
    sinon.spy(subject, 'pause');
    sinon.spy(subject, 'play');
    setImmediate(() => done());
  });

  afterEach(() => {
    InViewMonitor.add.restore();
    InViewMonitor.remove.restore();
    document.body.removeChild(subject);
  });

  it('sets the loop attribute', () => {
    expect(subject.getAttribute('loop')).to.eql('true');
  });

  it('sets the webkit-playsinline attribute', () => {
    expect(subject.getAttribute('webkit-playsinline')).to.eql('true');
  });

  it('overrides the video duration', () => {
    subject.setAttribute('cinemagraph-duration', '4.55');
    expect(subject.duration).to.eql(4.55);
  });

  describe('connectedCallback', () => {
    // Can't actually spy on the export like this.
    // Any testing ideas welcome.
    xit('calls makeVideoPlayableInline', () => {
      let spy = sinon.spy(iphoneInlineVideo, 'default');
      subject.connectedCallback();
      expect(spy).to.have.been.called;
    });

    it('registers with the InViewMonitor', () => {
      subject.connectedCallback();
      expect(InViewMonitor.add).to.have.been.called.once;
    });
  });

  describe('disconnectedCallback', () => {
    it('removes selve  from InViewMonitor', () => {
      subject.disconnectedCallback();
      expect(InViewMonitor.remove).to.have.been.called.once;
    });
  });

  describe('enterviewport event', () => {
    it('plays the video', () => {
      subject.dispatchEvent(new CustomEvent('enterviewport'));
      expect(subject.play).to.have.been.called.once;
    });
  });

  describe('exitviewport event', () => {
    it('pauses the video', () => {
      subject.dispatchEvent(new CustomEvent('exitviewport'));
      expect(subject.pause).to.have.been.called.once;
    });
  });
});
