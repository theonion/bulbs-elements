import './progress-bar';
import {
  appendFixtureContainer,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

describe('<progress-bar>', () => {
  let subject;
  let sandbox;
  let fixtureContainer;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    subject = document.createElement('progress-bar');
    subject.setAttribute('progress', '35');
    fixtureContainer = appendFixtureContainer();
    fixtureContainer.appendChild(subject);
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
  });

  it('renders a <progress-bar>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('progress-bar');
  });

  it('sets the width of the track based on the progress', (done) => {
    // setImmediate because setting innerHTML is sort-of async
    setImmediate(() => {
      let track = subject.children[0];
      expect(track.style.width).to.equal('65%');
      done();
    });
  });

  it('has a default progress of 0', (done) => {
    fixtureContainer.removeChild(subject);
    subject = document.createElement('progress-bar');
    fixtureContainer.appendChild(subject);
    // setImmediate because setting innerHTML is sort-of async
    setImmediate(() => {
      let track = subject.children[0];
      expect(track.style.width).to.equal('100%');
      done();
    });
  });

  describe('udpated progress attribute', (done) => {
    it('updates the track width when the progress changes', () => {
      let track = subject.children[0];
      subject.setAttribute('progress', '50');
      // setImmediate because setting innerHTML is sort-of async
      setImmediate(() => {
        expect(track.style.width).to.equal('50%');
        done();
      });
    });
  });
});
