import CosmodeQuiz from './cosmode-quiz';
import Quiz from './quiz';
import Question from './question';

describe('CosmodeQuiz', () => {
  let checkOutcomeButton;
  let element;
  let sandbox;
  let question;
  let answer;
  let input;
  let form;
  let postAnswerBodyElement;
  let subject;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-quiz');
    checkOutcomeButton = document.createElement('button');
    question = document.createElement('li');
    answer = document.createElement('dd');
    input = document.createElement('input');
    postAnswerBodyElement = document.createElement('div');
    form = document.createElement('form');

    question.className = 'question';
    answer.className = 'answer';
    input.type = 'radio';
    postAnswerBodyElement.style.display = 'none';
    postAnswerBodyElement.className = 'post-answer-body';
    checkOutcomeButton.className = 'check-outcome';

    answer.appendChild(input);
    answer.appendChild(postAnswerBodyElement);
    question.appendChild(answer);

    form.appendChild(question);
    element.appendChild(form);
    element.appendChild(checkOutcomeButton);

    subject = new CosmodeQuiz(element);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('is a Quiz', () => {
    expect(subject).to.be.an.instanceof(Quiz);
  });

  it('has an array of Questions', () => {
    subject.questions.forEach((q) => { expect(q).to.be.an.instanceof(Question); });
  });

  describe('allQuestionsAnswered', () => {
    let q1;
    let q2;

    beforeEach(() => {
      q1 = document.createElement('div');
      q2 = document.createElement('div');
      q1.dataset.unanswered = false;
      q2.dataset.unanswered = false;
      subject.questions = [new Question(q1), new Question(q2)];
    });

    it('returns true when all the questions have been answered', () => {
      expect(subject.allQuestionsAnswered()).to.equal(true);
    });

    it('returns false when any question is not answered', () => {
      q2.dataset.unanswered = true;
      expect(subject.allQuestionsAnswered()).to.equal(false);
    });
  });

  describe('isCompleted', () => {
    it('returns true when all questions are answered', () => {
      sandbox.stub(subject, 'allQuestionsAnswered').returns(true);
      expect(subject.isCompleted()).to.equal(true);
    });
  });

  describe('firstUnansweredQuestion', () => {
    let q1;
    let q2;

    beforeEach(() => {
      q1 = document.createElement('div');
      q2 = document.createElement('div');
      q1.dataset.unanswered = false;
      q2.dataset.unanswered = true;
      subject.questions = [new Question(q1), new Question(q2)];
    });

    it('returns the first unanswered question', () => {
      expect(subject.firstUnansweredQuestion()).to.equal(subject.questions[1]);
    });
  });

  describe('handleFormSubmit', () => {
    let event;

    beforeEach(() => {
      event = {
        preventDefault: sandbox.spy(),
      };
    });

    context('when the quiz is incomplete', () => {
      it('scrolls to the first unanswerd question', () => {
        sandbox.stub(question, 'scrollIntoView');
        sandbox.stub(subject, 'isCompleted').returns(false);
        sandbox.stub(subject, 'firstUnansweredQuestion').returns(new Question(question));
        subject.handleFormSubmit(event);
        expect(question.scrollIntoView).to.have.been.called;
      });
    });
  });

  describe('disableInputs', () => {
    let q1;
    let q2;

    beforeEach(() => {
      q1 = document.createElement('div');
      q2 = document.createElement('div');
      q1.appendChild(document.createElement('input'));
      q2.appendChild(document.createElement('input'));
      subject.questions = [new Question(q1), new Question(q2)];
    });

    it('disables each question input', () => {
      subject.questions.forEach((q) => {
        expect(q.input.disabled).to.equal(false);
      });
      subject.disableInputs();
      subject.questions.forEach((q) => {
        expect(q.input.disabled).to.equal(true);
      });
    });
  });

  describe('getScore', function() {
    xit('adds up the score from each input', function() {

    });
  });
});
