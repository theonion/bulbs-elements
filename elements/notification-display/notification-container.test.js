import React from 'react';
import NotificationContainer from './notification-container';
import NotificationDisplay from './notification-display';
import { mount, render, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';


var ls = global.localStorage;


describe('<notification-display>', () => {
  let props;
  let src;
  let notifications;
  beforeEach(() => {
    ls.clear();
    console.log(ls);

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

  describe('NotificationContainer', () => {
    context('Makes fetch request for notifications', () => {

      it('calls componentDidMount', () => {
        sinon.spy(NotificationContainer.prototype, 'componentDidMount');
        const wrapper = mount(<NotificationContainer {...props}/>);
        expect(NotificationContainer.prototype.componentDidMount).to.have.property('callCount', 1);
        NotificationContainer.prototype.componentDidMount.restore();
      });

      it('handles request success', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(instance.state.notification).to.equal(notifications[0]);
      });

      it('passes notifications to NotificationDisplay', () => {
        const wrapper = shallow(<NotificationContainer {...props}/>);
        wrapper.setState({ notification: notifications[0] });
        expect(wrapper.html()).to.equal('<div>Chief Keef gang gang.</div>');
      });

      it('handleRequestSuccess stores values in LocalStorage', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(ls.getItem('NotificationContainer')).to.eql(
          JSON.stringify({'local_notification_ids': [1]})
        );
      });

      it('retrieves value from LocalStorage', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(ls.getItem('NotificationContainer')).to.eql(
          JSON.stringify({'local_notification_ids': [1]})
        );

        const new_instance = mount(<NotificationContainer {...props}/>).instance();
        expect(new_instance.state.local_notification_ids).to.eql([1]);
      });

    });
  });
});
