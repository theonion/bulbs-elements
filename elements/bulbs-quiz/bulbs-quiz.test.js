import BulbsQuiz from './bulbs-quiz';

describe('<bulbs-quiz>', () => {
  let subject;
  let fixtureContainer;

  beforeEach(() => {
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
    subject = document.createElement('bulbs-quiz');
  });

  it('has tests', () => {
    expect(false).to.equal(true);
  });
});
