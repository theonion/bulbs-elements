export default class Quiz {
  constructor (element) {
    this.element = element;
    this.form = this.element.querySelectorAll('form')[0];
    this.checkOutcomeButton = this.element.querySelectorAll('.check-outcome')[0];
  }

  handleFormSubmit (event) {
    event.preventDefault();
    this.checkOutcome();
    if (this.isCompleted()) {
      this.checkOutcomeButton.style.display = 'none';
    }
  }

  checkOutcome () {}
  isCompleted () {}
}
