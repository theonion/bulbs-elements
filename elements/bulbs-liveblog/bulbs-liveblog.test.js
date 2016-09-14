import { allEntries } from './bulbs-liveblog';

describe.only('<bulbs-liveblog>', () => {
  let container;
  let subject;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.prepend(container);
    subject = document.createElement('bulbs-liveblog');
    subject.setAttribute('firebase-path', 'path/to/liveblog');
    subject.setAttribute('firebase-url', 'http://example.org');
    subject.setAttribute('firebase-api-key', 'fake-api-key');
    subject.setAttribute('liveblog-url', 'http://example.org/path/to/liveblog');
  });

  describe('attachedCallback', () => {
    beforeEach(() => {
      sinon.spy(subject, 'setupFirebase');
      sinon.spy(subject, 'setupInterval');
      sinon.spy(subject, 'setupEvents');
    });

    it('requires a `firebase-path` attribute', () => {
      subject.removeAttribute('firebase-path');
      expect(() => subject.attachedCallback()).to.throw(
        '<bulbs-liveblog> element MUST specify a `firebase-path` attribute'
      );
    });

    it('requires a `firebase-url` attribute', () => {
      subject.removeAttribute('firebase-url');
      expect(() => subject.attachedCallback()).to.throw(
        '<bulbs-liveblog> element MUST specify a `firebase-url` attribute'
      );
    });

    it('requires a `firebase-api-key` attribute', () => {
      subject.removeAttribute('firebase-api-key');
      expect(() => subject.attachedCallback()).to.throw(
        '<bulbs-liveblog> element MUST specify a `firebase-api-key` attribute'
      );
    });

    it('requires a `liveblog-url` attribute', () => {
      subject.removeAttribute('liveblog-url');
      expect(() => subject.attachedCallback()).to.throw(
        '<bulbs-liveblog> element MUST specify a `liveblog-url` attribute'
      );
    });

    it('sets up firebase', () => {
      subject.attachedCallback();
      expect(subject.setupFirebase).to.have.been.called.once;
    });

    it('starts a lookup interval', () => {
      subject.attachedCallback();
      expect(subject.setupInterval).to.have.been.called.once;
    });

    it('registers event handlers', () => {
      subject.attachedCallback();
      expect(subject.setupEvents).to.have.been.called.once;
    });

    xit('tracks newEntriesButtons', () => {

    });

    xit('creates a staging pad for new entries', () => {

    });

    xit('tracks the liveblog-entries', () => {

    });
  });

  describe('setupFirebase', () => {
    xit('creates a firebase ref to the `firebase-path`', () => {

    });

    xit('orders the firebase query by published', () => {

    });

    xit('limits the firebasequery to 100 items', () => {

    });
  });

  describe('setupInterval', () => {
    xit('connects an interval handler every LIVEBLOG_LATENCY seconds', () => {

    });
  });

  describe('setupEvents', () => {
    xit('attaches a click handler', () => {
    });

    xit('attaches a firebase value handler', () => {

    });
  });

  describe('detachedCallback', () => {
    xit('tears down firebase', () => {

    });

    xit('tears down the interval', () => {

    });
  });

  describe('teardownFirebase', () => {
    xit('disconnects firebase events', () => {

    });
  });

  describe('teardownInterval', () => {
    xit('clears the interval', () => {

    });
  });

  describe('handleFirebaseValue', () => {
    xit('stores the snapshot value', () => {

    });

    xit('parses entry published dates', () => {

    });
  });

  describe('handleInterval', () => {
    xit('requests new content', () => {

    });

    xit('bails out if liveblog is fetching new content', () => {

    });
  });

  describe('handleClick', () => {
    xit('handles showing new entries', () => {

    });

    xit('handles resetting the selected entry', () => {

    });
  });

  describe('showNewEntries', () => {
    xit('removes the show new entries button', () => {

    });

    xit('places the entries in the entries container', () => {

    });

    xit('scrolls to the new entries', () => {

    });

    xit('runs the picturefill', () => {

    });
  });

  describe('resetSelectedEntry', () => {
    xit('removes the .liveblog-entry-shared class from the entry', () => {

    });
  });

  describe('handleBlogUpdate', () => {
    xit('fetches new content for the given entry ids', () => {

    });

    xit('records that liveblog is fetching new content', () => {

    });
  });

  describe('handleBlogFetchSuccess', () => {
    xit('adds the new content to the staging area', () => {

    });

    xit('removes <noscript> tags from the new content', () => {

    });

    xit('displays a button to show the new entries', () => {

    });

    xit('records that the liveblog is no longer fetching content', () => {

    });
  });

  describe('handleBlogFetchError', () => {
    xit('records that the liveblog is no longer fetching content', () => {

    });
  });

  describe('removeNewEntriesButton', () => {
    xit('removes the show new entries button', () => {

    });
  });
});

describe('<bulbs-liveblog-entry>', () => {
  let container;
  let subject;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.prepend(container);
    subject = document.createElement('bulbs-liveblog-entry');
  });

  afterEach(() => container.remove());

  describe('attachedCallback', () => {
    it('it requires an `entry-id` attribute', () => {
      subject.removeAttribute('entry-id');

      expect(() => {
        subject.attachedCallback();
      }).to.throw('<bulbs-liveblog-entry> element MUST specify an `entry-id` attribute');
    });

    it('registers itself as an entry', () => {
      let entry = document.createElement('bulbs-liveblog-entry');
      entry.setAttribute('entry-id', '1234');
      container.appendChild(entry);
      expect(allEntries['1234']).to.not.be.undefined;
    });
  });

  describe('detachedCallback', () => {
    it('unregisters itself as an entry', () => {
      let entry = document.createElement('bulbs-liveblog-entry');
      entry.setAttribute('entry-id', '1234');
      container.appendChild(entry);
      expect(allEntries['1234']).to.not.be.undefined;
      entry.remove();
      expect(allEntries['1234']).to.be.undefined;
    });
  });
});
