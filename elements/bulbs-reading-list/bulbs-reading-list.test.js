import './bulbs-reading-list';
import buildReadingListFixture from './lib/reading-list-test-helper';
import {
  appendFixtureContainer,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

describe('<bulbs-reading-list>', () => {
  let subject;
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    let fixtureContainer = appendFixtureContainer();
    let readingListElement = buildReadingListFixture();
    fixtureContainer.appendChild(readingListElement);
    subject = readingListElement;
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });
});
