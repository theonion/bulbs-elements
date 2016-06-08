import React from 'react';
import VoteButton from './vote-button';

export default function ComingSoon () {
  return (
    <div className='bulbs-poll-coming-soon'>
      <div className='bulbs-poll-coming-soon-message'>Poll Coming Soon</div>
      <VoteButton/>
    </div>
  );
}
