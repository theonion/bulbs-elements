import React from 'react';
import Store from 'bulbs-elements/store';
import { assertJSXEqual } from 'bulbs-elements/test/assertions';
import BulbsPollRoot from './root';
import PollSchema from '../bulbs-poll-schema';

import PollQuestion from './question';
import PollResults from './results';
import PollEnded from './ended';
import PollLoading from './loading';
import ComingSoon from './coming-soon';

describe('<bulbs-poll> <BulbsPollRoot>', function () {
  let store;
  let data;
  let actions;
  let props;

  beforeEach(function () {
    store = new Store({ schema: PollSchema });
    data = store.state;
    data.poll.data.id = 1;
    actions = store.actions;
    props = {
      data,
      actions,
    };
  });

  context('poll has not loaded', function () {
    beforeEach(function() {
      delete data.poll.data.id;
    });

    it('renders PollLoading', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>, <PollLoading />);
    });
  });

  context('active poll, viewer has not voted', function () {
    beforeEach(function () {
      data.poll.data.published = new Date(data.now.getTime() - (1000 * 60 * 60 * 24 * 7));
    });

    it('renders PollQuestion', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>,
        <PollQuestion
          data={data}
          actions={actions}
        />
      );
    });
  });

  context('active poll, viewer has voted', function () {
    beforeEach(function () {
      data.poll.data.published = new Date(data.now.getTime() - (1000 * 60 * 60 * 24 * 7));
      data.vote.voted = true;
    });

    it('renders PollResults', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>,
        <PollResults data={props.data}/>
      );
    });
  });

  context('poll has null published date', function () {
    beforeEach(function () {
      data.poll.data.published = null;
    });

    it('renders ComingSoon', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>, <ComingSoon/>);
    });
  });

  context('poll is not active yet', function () {
    beforeEach(function () {
      data.poll.data.published = new Date(data.now.getTime() + (1000 * 60 * 60 * 24 * 7));
    });

    it('renders ComingSoon', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>, <ComingSoon/>);
    });
  });

  context('poll is closed', function () {
    beforeEach(function () {
      data.poll.data.published = new Date(data.now.getTime() - (1000 * 60 * 60 * 24 * 14));
      data.poll.data.end_date = new Date(data.now.getTime() - (1000 * 60 * 60 * 24 * 7));
    });

    it('renders PollEnded', function () {
      assertJSXEqual(this.test.title, <BulbsPollRoot {...props}/>,
        <PollEnded data={props.data}/>
      );
    });
  });
});
