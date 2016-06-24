import invariant from 'invariant';

export default class Question {
  constructor (element) {
    invariant(element, 'bulbs-quiz new Question(element): element is undefined');
    this.element = element;
    this.answer = this.element.getElementsByClassName('answer')[0];
    this.input = this.element.getElementsByTagName('input')[0];
    this.postAnswerBody = this.element.getElementsByClassName('post-answer-body')[0];
  }

  handleInputChange () {
    this.element.dataset.unanswered = false;
    this.postAnswerBody.style.display = 'block';
  }

  isAnswered () {
    return this.element.dataset.unanswered === 'false';
  }

  disableInput () {
    this.input.disabled = true;
  }

  enableInput () {
    this.input.disabled = false;
  }
 }
