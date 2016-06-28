import Quiz from './quiz';

describe('Quiz', () => {
  let subject;
  let element;
  let form;
  let input;
  let checkOutcomeButton;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-quiz');
    input = document.createElement('input');
    form = document.createElement('form');
    checkOutcomeButton = document.createElement('button');

    element.className = 'quiz-style-test';
    input.type = 'text';
    input.value = 'Test Value';
    checkOutcomeButton.className = 'check-outcome';
    form.appendChild(input);
    element.appendChild(form);
    element.appendChild(checkOutcomeButton);
    debugger
    document.body.appendChild(element);
    subject = new Quiz(element);
  });

  it('accepts an element and sets it as a property', () => {
    expect(subject.element).to.equal(element);
  });

  it('has a reference to the .check-outcome element', () => {
    expect(subject.checkOutcomeButton).to.equal(checkOutcomeButton);
  });

  it('saves a reference to the form element', () => {
    expect(subject.form).to.equal(form);
  });

  describe('handleFormSubmit', () => {
    let event;
    beforeEach(() => {
      event = {
        preventDefault: sandbox.spy(),
      };
    });

    it('prevents the form from posting data', () => {
      subject.handleFormSubmit(event);
      expect(event.preventDefault).to.have.been.called;
    });

    it('checks the outcome of the quiz', () => {
      sandbox.stub(subject, 'checkOutcome');
      subject.handleFormSubmit(event);
      expect(subject.checkOutcome).to.have.been.called;
    });

    it('hides the checkOutcomeButton when the quiz is complete', () => {
      sandbox.stub(subject, 'isCompleted').returns(true);
      subject.handleFormSubmit(event);
      expect(subject.checkOutcomeButton.style.display).to.equal('none');
    });

    it('does not hide the checkOutcomeButton when the quiz is not complete', () => {
      sandbox.stub(subject, 'isCompleted').returns(false);
      subject.handleFormSubmit(event);
      expect(subject.checkOutcomeButton.style.display).to.equal('');
    });
  });

  describe('getFormData', () => {
    it('returns a serialized version of the form', () => {
      expect(subject.getFormData()).to.equal([]);
    });
  });
});
