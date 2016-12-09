import './progress-bar';
import {
  appendFixtureContainer,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

describe('<progress-bar>', () => {
  let subject;
  let sandbox;
  let fixtureContainer;

  function appendSubject() {
    return (new Promise(resolve => {
      fixtureContainer = appendFixtureContainer();
      fixtureContainer.appendChild(subject);

      setImmediate(resolve);
    }));
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    subject = document.createElement('progress-bar');
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
  });

  it('renders a <progress-bar>', (done) => {
    appendSubject()
      .then(() => {
        expect(subject.tagName.toLowerCase()).to.equal('progress-bar');
        done();
      });
  });

  it('sets the width of the track based on the progress', (done) => {
    // setImmediate because setting innerHTML is sort-of async
    subject.setAttribute('progress', 35);

    appendSubject()
      .then(() => {
        let track = subject.children[0];
        expect(track.style.width).to.equal('65%');
        done();
      });
  });

  it('has a default progress of 0', (done) => {
    // setImmediate because setting innerHTML is sort-of async
    appendSubject()
      .then(() => {
        let track = subject.children[0];
        expect(track.style.width).to.equal('100%');
        done();
      });
  });

  describe('udpated progress attribute', () => {
    it('updates the track width when the progress changes', (done) => {
      // setImmediate because setting innerHTML is sort-of async
      let track;

      appendSubject()
        .then(() => {
          track = subject.children[0]
          subject.setAttribute('progress', '50');
        })
        .then(() => {
          setImmediate(() => {
            expect(track.style.width).to.equal('50%');
            done();
          });
        });
    });
  });
});
