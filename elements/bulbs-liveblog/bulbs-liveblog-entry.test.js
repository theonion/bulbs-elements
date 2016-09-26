import './bulbs-liveblog';
import './bulbs-liveblog-entry';

let pastDate = new Date((new Date()).getTime() - 10000000000);

describe('<bulbs-liveblog-entry>', () => {
  let container;
  let subject;

  beforeEach((done) => {
    container = document.createElement('bulbs-liveblog');
    container.setAttribute('firebase-url', 'http://example.firebaseio.com');
    container.setAttribute('firebase-path', 'some-path');
    container.setAttribute('firebase-api-key', 'some-api-key');
    container.setAttribute('liveblog-new-entries-url', 'http://example.org/new-entries');
    container.setAttribute('liveblog-id', Math.random());
    document.body.prepend(container);
    subject = document.createElement('bulbs-liveblog-entry');
    subject.setAttribute('entry-id', '1234');
    subject.setAttribute('entry-published', pastDate);
    container.append(subject);
    setImmediate(() => done());
  });

  afterEach(() => container.remove());

  describe('attachedCallback', () => {
    it('it requires an `entry-id` attribute', () => {
      subject.removeAttribute('entry-id');

      expect(() => {
        subject.attachedCallback();
      }).to.throw('<bulbs-liveblog-entry> element MUST specify an `entry-id` attribute');
    });

    it('requires an `entry-published` attribute', () => {
      subject.removeAttribute('entry-published');

      expect(() => {
        subject.attachedCallback();
      }).to.throw('<bulbs-liveblog-entry> element MUST specify an `entry-published` attribute');
    });

    it('requires a parent `bulbs-liveblog` element', () => {
      expect(() => {
        document.createElement('bulbs-liveblog-entry').attachedCallback();
      }).to.throw('<bulbs-liveblog-entry> element MUST be placed within a <bulbs-liveblog>');
    });

    it('emits liveblog-entry-attached event', () => {
      let entry = document.createElement('bulbs-liveblog-entry');
      let eventSpy = sinon.spy();
      entry.setAttribute('entry-id', '1234');
      entry.setAttribute('entry-published', pastDate);
      entry.addEventListener('liveblog-entry-attached', eventSpy);
      container.appendChild(entry);
      expect(eventSpy).to.have.been.called;
    });
  });

  describe('detachedCallback', () => {
    it('emits liveblog-entry-detached event', () => {
      let entry = document.createElement('bulbs-liveblog-entry');
      let eventSpy = sinon.spy();
      entry.setAttribute('entry-id', '1234');
      entry.setAttribute('entry-published', pastDate);
      container.appendChild(entry);
      entry.addEventListener('liveblog-entry-detached', eventSpy);
      entry.remove();
      expect(eventSpy).to.have.been.called;
    });
  });
});

