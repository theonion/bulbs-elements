import React, { PropTypes } from 'react';

import PollLoading from './loading';
import PollQuestion from './question';
import PollResults from './results';
import PollEnded from './ended';
import ComingSoon from './coming-soon';

export default function Root (props) {
  let pollData = props.data.poll.data;
  let now = props.data.now;
  let pollNotLoaded = !pollData.id;
  let pollIsPublished = pollData.published && pollData.published <= now;
  let pollHasEnded = pollData.end_date && pollData.end_date <= now;
  let viewerHasVoted = props.data.vote.voted;

  if (pollNotLoaded) {
    return <PollLoading/>;
  }
  else if (!pollIsPublished) {
    return <ComingSoon/>;
  }
  else if (pollHasEnded) {
    return <PollEnded
      data={props.data}
    />;
  }
  else if (viewerHasVoted) {
    return <PollResults
      data={props.data}
    />;
  }
  else if (pollIsPublished) {
    return <PollQuestion
      actions={props.actions}
      data={props.data}
    />;
  }
}

Root.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
