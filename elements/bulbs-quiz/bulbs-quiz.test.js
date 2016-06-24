import BulbsQuiz from './bulbs-quiz';

describe('<bulbs-quiz>', function () {
  let subject;
  let fixtureContainer;

  beforeEach(function () {
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
    subject = document.createElement('bulbs-quiz');
  });

  describe('quizType', function() {
    it('returns null when there is no quiz type', function() {
      expect(subject.quizType).to.equal(null);
    });

    it('returns the type when the quiz-style-<type> class is present', function() {
      subject.className = 'quiz-style-tally';
      expect(subject.quizType).to.equal('tally');
    });
  });

  describe('#validate', function() {
    it('throws an error if there is no quiz type', function() {
      expect(() => subject.validate()).to.throw('bulbs-quiz requires a quiz-style-<type> class');
    });
  });
});
