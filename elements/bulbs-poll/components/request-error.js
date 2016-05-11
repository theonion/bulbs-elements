import React, { PropTypes } from 'react';

export default function RequestError (props) {
  let { error, children, reset } = props;
  if (error) {
    return (
      <div className="bulbs-poll-network-error">
        <p>
          { children }
        </p>
        <button onClick={reset}>OK</button>
      </div>
    );
  }
  else {
    return <div />;
  }
}

RequestError.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
  reset: PropTypes.func,
};
