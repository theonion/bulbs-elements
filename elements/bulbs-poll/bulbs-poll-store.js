import { Store } from 'bulbs-elements/store';

import PollField from './fields/poll';
import SelectedAnswerField from './fields/selected-answer';
import WinningAnswersField from './fields/winning-answers';
import VoteField from './fields/vote';
import SrcField from './fields/src';
import NowField from './fields/now';

export default const PollSchema = {
  poll: PollField,
  selectedAnswer: SelectedAnswerField,
  winningAnswers: WinningAnswersField,
  vote: VoteField,
  src: SrcField,
  now: NowField,
};
