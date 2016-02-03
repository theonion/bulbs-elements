import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Result from './result';

export default function Results (props) {
  let className = classnames('bulbs-poll-results', {});
  let {
    poll,
  } = props.data;

  return (
    <div className={className}>
      {
        poll.answers.map((answer, index) => {
          return <Result
            key={index}
            answer={answer}
            poll={poll}
          />;
        })
      }
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.object.isRequired,
};
