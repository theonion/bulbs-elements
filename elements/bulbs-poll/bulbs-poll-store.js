import { Store } from 'bulbs-elements/store';

import PollField from './fields/poll';
import SelectedAnswerField from './fields/selected-answer';
import VoteField from './fields/vote';
import SrcField from './fields/src';

export default class PollStore extends Store { }

Store.defineFields(PollStore, {
  poll: PollField,
  selectedAnswer: SelectedAnswerField,
  vote: VoteField,
  src: SrcField,
});
