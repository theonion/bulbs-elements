import Quiz from './quiz';
import Question from './question';
import { map, every, find } from 'lodash';

export default class CosmodeQuiz extends Quiz {
  constructor (element) {
    super(element);
    let questionElements = this.element.getElementsByClassName('.question');
    this.questions = map(questionElements, (questionElement) => new Question(questionElement));
  }

  allQuestionsAnswered () {
    return every(this.questions, (q) => q.isAnswered());
  }

  isCompleted () {
    return this.allQuestionsAnswered();
  }

  handleFormSubmit (event) {
    super.handleFormSubmit(event);
    if (!this.isCompleted()) {
      this.firstUnansweredQuestion().element.scrollIntoView();
    }
  }

  firstUnansweredQuestion () {
    return find(this.questions, (q) => !q.isAnswered());
  }

  disableInputs () {
    this.questions.forEach((question) => question.disableInput());
  }

  enableInputs () {
    this.questions.forEach((question) => question.enableInput());
  }

  getScore () {

  }
}
