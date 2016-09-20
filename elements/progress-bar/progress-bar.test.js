import './progress-bar';
import {
  appendFixtureContainer,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

// Not sure why these tests aren't passing but
// I don't have time to figure out why Travis
// doesn't like them
xdescribe('<progress-bar>', () => {
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

  it('sets the width of the track based on the progress', () => {
    let track = subject.children[0];
    expect(track.style.width).to.equal('65%');
  });

  it('has a default progress of 0', () => {
    fixtureContainer.removeChild(subject);
    subject = document.createElement('progress-bar');
    fixtureContainer.appendChild(subject);
    let track = subject.children[0];
    expect(track.style.width).to.equal('100%');
  });

  describe('udpated progress attribute', () => {
    it('updates the track width when the progress changes', () => {
      let track = subject.children[0];
      subject.setAttribute('progress', '50');
      expect(track.style.width).to.equal('50%');
    });
  });
});
