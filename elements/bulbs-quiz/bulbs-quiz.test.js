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
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('TestQuiz', () => {
    it('instantiates a TestQuiz when the quiz style is test', (done) => {
      fixtureContainer.appendChild(subject);
      setImmediate(() => {
        expect(subject.quiz).to.be.an.instanceof(TestQuiz);
        done()
      });
    });
  });

  describe('TallyQuiz', () => {
    it('instantiates a TallyQuiz when the quiz style is tally', (done) => {
      subject.className = 'quiz-style-tally';
      fixtureContainer.appendChild(subject);
      setImmediate(() => {
        expect(subject.quiz).to.be.an.instanceof(TallyQuiz);
        done();
      });
    });
  });

  describe('MultipleChoiceQuiz', () => {
    it('instantiates a MultipleChoiceQuiz when the quiz style is multiple', (done) => {
      subject.className = 'quiz-style-multiple';
      fixtureContainer.appendChild(subject);
      setImmediate(() => {
        expect(subject.quiz).to.be.an.instanceof(MultipleChoiceQuiz);
        done();
      });
    });
  });

  describe('CosmodeQuiz', () => {
    it('instantiates a CosmodeQuiz when the quiz style is cosmo', (done) => {
      subject.className = 'quiz-style-cosmo';
      fixtureContainer.appendChild(subject);
      setImmediate(() => {
        expect(subject.quiz).to.be.an.instanceof(CosmodeQuiz);
        done();
      });
    });
  });
});
