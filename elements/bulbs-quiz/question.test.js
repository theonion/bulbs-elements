import Question from './question';

describe('Question', () => {
  let subject;
  let questionElement;
  let answerElement;
  let inputElement;
  let postAnswerBodyElement;

  beforeEach(() => {
    questionElement = document.createElement('div');
    questionElement.className = 'question';
    answerElement = document.createElement('div');
    answerElement.className = 'answer';
    inputElement = document.createElement('input');
    postAnswerBodyElement = document.createElement('div');
    postAnswerBodyElement.style.display = 'none';
    postAnswerBodyElement.className = 'post-answer-body';

    questionElement.dataset.unanswered = true;
    answerElement.appendChild(inputElement);
    answerElement.appendChild(postAnswerBodyElement);
    questionElement.appendChild(answerElement);

    subject = new Question(questionElement);
  });

  it('requires a question element', () => {
    expect(() => {
      new Question();// eslint-disable-line no-new
    }).to.throw('bulbs-quiz new Question(element): element is undefined');
  });

  it('saves a reference to the question element', () => {
    expect(subject.element).equal(questionElement);
  });

  it('saves a reference to the answer element', () => {
    expect(subject.answer).to.equal(answerElement);
  });

  it('saves a reference to the input element', () => {
    expect(subject.input).to.equal(inputElement);
  });

  it('saves a reference to the .post-answer-body element', () => {
    expect(subject.postAnswerBody).to.equal(postAnswerBodyElement);
  });

  describe('handleInputChange', () => {
    it('marks the question as answered', () => {
      subject.handleInputChange();
      expect(subject.element.dataset.unanswered).to.equal('false');
    });

    it('sets the postAnswerBody display property to block', () => {
      subject.handleInputChange();
      expect(subject.postAnswerBody.style.display).to.equal('block');
    });
  });

  describe('isAnswered', () => {
    it('returns true when the unanswered data property is false', () => {
      expect(subject.isAnswered()).to.equal(false);
    });

    it('returns false when the unanswered data property is true', () => {
      subject.element.dataset.unanswered = 'true';
      expect(subject.isAnswered()).to.equal(false);
    });
  });

  describe('disableInput', () => {
    it('disables the input element', () => {
      subject.disableInput();
      expect(subject.input.disabled).to.equal(true);
    });
  });

  describe('enableInput', () => {
    it('enables the input element', () => {
      subject.enableInput();
      expect(subject.input.disabled).to.equal(false);
    });
  });
});
