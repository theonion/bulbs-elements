import React from 'react';
import NotificationContainer from './notification-container';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

let ls = global.localStorage;

describe('<notification-display>', () => {

  let props;
  let src;
  let src2;
  let notifications;
  let notifications2;

  beforeEach(() => {
    ls.clear();

    src = 'http://example.com/notifications';
    src2 = 'http://example.com/notifications/page';
    notifications = {
      'next': src2,
      'results': [{
        id: 1,
        internal_title: 'da boys',
        headline: 'Chief Keef gang gang.',
        body: 'we out here',
        image: { 'id': 1 },
        image_url: 'http://example.com/campain-img.jpg',
        clickthrough_cta: 'Read More...',
        clickthrough_url: 'http://example.com/clickthrough',
      }],
    };
    notifications2 = {
      'next': null,
      'results': [{
        id: 2,
        internal_title: 'da fellas',
        headline: 'Keep Russell Wilson away from baby future',
        body: 'Seriously, that my baby!',
        image: { 'id': 2 },
        image_url: 'http://example.com/baby-future.jpg',
        clickthrough_cta: 'Read More...',
        clickthrough_url: 'comethru and click',
      }],
    };

    props = {
      src,
    };

    fetchMock
      .mock(src, notifications)
      .mock(src2, notifications2);
  });

  describe('NotificationContainer', () => {
    context('Makes fetch request for notifications', () => {

      it('calls componentDidMount', () => {
        sinon.spy(NotificationContainer.prototype, 'componentDidMount');
        mount(<NotificationContainer {...props}/>);
        expect(NotificationContainer.prototype.componentDidMount).to.have.property('callCount', 1);
        NotificationContainer.prototype.componentDidMount.restore();
      });

      it('handles request success', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(instance.state.notification).to.equal(notifications.results[0]);
      });

      it('passes notifications to NotificationDisplay', () => {
        const wrapper = shallow(<NotificationContainer {...props}/>);
        wrapper.setState({ notification: notifications.results[0] });
        expect(wrapper.html()).to.contain(notifications.results[0].body);
      });

      it('handleRequestSuccess stores values in LocalStorage', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(ls.getItem('onion-local-notification-ids')).to.eql(
          JSON.stringify([1])
        );
      });

      it('retrieves value from LocalStorage', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);
        expect(ls.getItem('onion-local-notification-ids')).to.eql(JSON.stringify([1]));
        const new_instance = mount(<NotificationContainer {...props}/>).instance();
        expect(new_instance.state.localNotificationIds).to.eql([1]);
      });

      it('exhausts notifications with pagination', () => {
        const instance = mount(<NotificationContainer {...props}/>).instance();
        instance.handleRequestSuccess(notifications);

        const new_instance = mount(<NotificationContainer {...props}/>).instance();
        expect(new_instance.state.localNotificationIds).to.eql([1]);
        new_instance.handleRequestSuccess(notifications2);
        expect(new_instance.state.notification).to.eql(notifications2.results[0]);
      });

    });
  });
});
