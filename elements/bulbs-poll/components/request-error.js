import React from 'react';

export default function RequestError ({ error, children, reset }) {
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
