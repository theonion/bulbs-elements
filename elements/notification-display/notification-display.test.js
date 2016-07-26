import React from 'react';
import NotificationDisplay from './notification-display';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

describe('<notification-display>', () => {
  let subject;
  let props;
  let src;
  let notifications;
  beforeEach(() => {
    src = 'http://example.com/notifications';
    notifications = [{
      id: 1,
      internal_title: 'da boys',
      headline: 'Chief Keef gang gang.',
      body: 'we out here',
      image: {'id': 1},
      image_url: 'http://example.com/campain-img.jpg',
      clickthrough_url: 'http://example.com/clickthrough',
    }];

    props = {
      src
    };

    fetchMock.mock(src, notifications);
  });

  describe('handleRequestSuccess', () => {
    context('src is truthy', () => {
      it('fetches notification data for display', () => {
        let subject = shallow(<NotificationDisplay {...props}/>);
        expect(subject.equals(<div>Chief Keef gang gang</div>)).to.be.true;
      });
    });
  });

});
