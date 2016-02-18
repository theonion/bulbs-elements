import { Field, Action } from 'bulbs-elements/store';

const WinningAnswersField = new Field({
  initialState: [],
  collectWinningAnswers: new Action(function (state, answers=[]) {
    let highScore = 0;
    let winningAnswers = [];

    answers.forEach((eachAnswer) => {
      if (eachAnswer.total_votes === highScore) {
        winningAnswers.push(eachAnswer);
      }
      else if (eachAnswer.total_votes > highScore) {
        highScore = eachAnswer.total_votes;
        winningAnswers = [eachAnswer];
      }
    });

    return winningAnswers;
  }),
});

export default WinningAnswersField;
