import BulbsQuiz from './bulbs-quiz'; // eslint-disable-line no-unused-vars
import TestQuiz from './test-quiz';
import TallyQuiz from './tally-quiz';
import MultipleChoiceQuiz from './multiple-choice-quiz';
import CosmodeQuiz from './cosmode-quiz';

describe('<bulbs-quiz>', () => {
  let subject;
  let fixtureContainer;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
    subject = document.createElement('bulbs-quiz');
    subject.attributes['content-id'] = 1;
    subject.className = 'quiz-style-test';
    sandbox.stub(TestQuiz.prototype, 'setup');
    sandbox.stub(TallyQuiz.prototype, 'setup');
    sandbox.stub(MultipleChoiceQuiz.prototype, 'setup');
    sandbox.stub(CosmodeQuiz.prototype, 'setup');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('TestQuiz', () => {
    it('instantiates a TestQuiz when the quiz style is test', () => {
      fixtureContainer.appendChild(subject);
      expect(TestQuiz.prototype.setup).to.have.been.called;
    });
  });

  describe('TallyQuiz', () => {
    it('instantiates a TallyQuiz when the quiz style is tally', () => {
      subject.className = 'quiz-style-tally';
      fixtureContainer.appendChild(subject);
      expect(TallyQuiz.prototype.setup).to.have.been.called;
    });
  });

  describe('MultipleChoiceQuiz', () => {
    it('instantiates a MultipleChoiceQuiz when the quiz style is multiple', () => {
      subject.className = 'quiz-style-multiple';
      fixtureContainer.appendChild(subject);
      expect(MultipleChoiceQuiz.prototype.setup).to.have.been.called;
    });
  });

  describe('CosmodeQuiz', () => {
    it('instantiates a CosmodeQuiz when the quiz style is cosmo', () => {
      subject.className = 'quiz-style-cosmo';
      fixtureContainer.appendChild(subject);
      expect(CosmodeQuiz.prototype.setup).to.have.been.called;
    });
  });
});
