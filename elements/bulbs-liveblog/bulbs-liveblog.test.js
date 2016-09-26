import './bulbs-liveblog';
import './bulbs-liveblog-entry';

import fetchMock from 'fetch-mock';

const HTMLCollectionClass = document.getElementsByTagName('a-tag').constructor;

let futureDate = new Date((new Date()).getTime() + 10000000000);
let pastDate = new Date((new Date()).getTime() - 10000000000);
let currentDate = new Date();

describe('<bulbs-liveblog>', () => {
  let container;
  let subject;
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    window.picturefill = sandbox.spy();
    subject = document.createElement('bulbs-liveblog');
    subject.setAttribute('firebase-path', 'path/to/liveblog');
    subject.setAttribute('firebase-url', 'http://example.firebaseio.com');
    subject.setAttribute('firebase-api-key', 'fake-api-key');
    subject.setAttribute('liveblog-id', String(Math.random()).replace(/^0\./, ''));
    subject.setAttribute('liveblog-new-entries-url', 'http://example.org/path/to/liveblog');

    subject.innerHTML = `
      <div class="liveblog-entries">
        <bulbs-liveblog-entry
          entry-id="1234"
          entry-published="${pastDate}"
          class="liveblog-entry-shared"
        >
        </bulbs-livebloge-entry>
      </div>
    `;
    setImmediate(() => done());
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('attachedCallback', () => {
    beforeEach(() => {
      sandbox.stub(subject, 'setupFirebase');
      sandbox.stub(subject, 'setupInterval');
      sandbox.stub(subject, 'setupEvents');
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

    it('requires a `liveblog-new-entries-url` attribute', () => {
      subject.removeAttribute('liveblog-new-entries-url');
      expect(() => subject.attachedCallback()).to.throw(
        '<bulbs-liveblog> element MUST specify a `liveblog-new-entries-url` attribute'
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

    it('tracks newEntriesButtons', () => {
      subject.attachedCallback();
      expect(subject.newEntriesButtons).to.be.an.instanceof(HTMLCollectionClass);
    });

    it('creates a staging pad for new entries', () => {
      subject.attachedCallback();
      expect(subject.entryStaging.matches('div')).to.be.true;
    });

    it('hides the staging pad for new entries', () => {
      subject.attachedCallback();
      expect(subject.entryStaging.style.display).to.eql('none');
    });

    it('initializes entriesData', () => {
      subject.attachedCallback();
      expect(subject.entriesData).to.eql({});
    });

    it('tracks the liveblog entries container', () => {
      subject.attachedCallback();
      expect(subject.entriesContainer).to.be.an.instanceof(HTMLCollectionClass);
    });

    it('tracks the liveblog-entries', () => {
      subject.attachedCallback();
      expect(subject.entriesElements).to.be.an.instanceof(HTMLCollectionClass);
    });
  });

  describe('setupFirebase', () => {
    xit('creates a firebase ref to the `firebase-path`', () => {

    });

    xit('orders the firebase query by published', () => {

    });

    xit('limits the firebase query to 100 items', () => {

    });
  });

  describe('setupInterval', () => {
    it('connects an interval handler every LIVEBLOG_LATENCY seconds', () => {
      sandbox.stub(window, 'setInterval');
      subject.setupInterval();
      expect(window.setInterval).to.have.been.calledWith(subject.handleInterval, 5000);
      window.setInterval.restore();
    });
  });

  describe('setupEvents', () => {
    beforeEach(() => {
      subject.firebaseRef = { on: sandbox.spy() };
      sandbox.spy(subject, 'addEventListener');
    });

    it('attaches a click handler', () => {
      subject.setupEvents();
      expect(subject.addEventListener).to.have.been.calledWith('click', subject.handleClick);
    });

    it('attaches a firebase value handler', () => {
      subject.setupEvents();
      expect(subject.firebaseRef.on).to.have.been.calledWith('value', subject.handleFirebaseValue);
    });
  });

  describe('detachedCallback', () => {
    beforeEach(() => {
      sandbox.stub(subject, 'teardownFirebase');
      sandbox.spy(subject, 'teardownInterval');
    });

    it('tears down firebase', () => {
      subject.detachedCallback();
      expect(subject.teardownFirebase).to.have.been.called;
    });

    it('tears down the interval', () => {
      subject.detachedCallback();
      expect(subject.teardownInterval).to.have.been.called;
    });
  });

  describe('teardownFirebase', () => {
    it('disconnects firebase events', () => {
      subject.firebaseRef = { off: sandbox.spy() };
      subject.teardownFirebase();
      expect(subject.firebaseRef.off).to.have.been.called;
    });
  });

  describe('teardownInterval', () => {
    it('clears the interval', () => {
      sandbox.spy(window, 'clearInterval');
      subject.interval = 'our-interval';
      subject.teardownInterval();
      expect(window.clearInterval).to.have.been.calledWith('our-interval');
      window.clearInterval.restore();
    });
  });

  describe('handleFirebaseValue', () => {
    it('stores the snapshot value', () => {
      let snapshot = [];
      subject.handleFirebaseValue({
        val: () => snapshot,
      });
      expect(subject.entriesData).to.eql(snapshot);
    });

    it('parses entry published dates', () => {
      let snapshot = {
        one: {
          published: '2016-09-19T11:09:06.668617',
        },
      };
      subject.handleFirebaseValue({
        val: () => snapshot,
      });

      let { published } = subject.entriesData.one;

      expect(published.getDate()).to.eql(19);
    });
  });

  context('attached', () => {
    beforeEach((done) => {
      container = document.createElement('div');
      document.body.append(container);
      container.append(subject);
      setImmediate(() => {
        done();
      });
    });

    afterEach((done) => {
      subject.remove();
      setImmediate(() => {
        done();
      });
    });

    describe('handleInterval', () => {
      beforeEach(() => sandbox.spy(subject, 'handleBlogUpdate'));

      context('no new content to fetch', () => {
        it('does nothing', () => {
          subject.entriesData = {};
          subject.handleInterval();
          expect(subject.handleBlogUpdate).to.not.have.been.called;
        });
      });

      context('there is new content to fetch', () => {
        it('requests new content', () => {
          subject.entriesData = {
            1: {
              published: new Date(1987, 3, 11),
            },
          };
          subject.handleInterval();
          expect(subject.handleBlogUpdate).to.not.have.been.calledWith([1]);
        });

        context('liveblog is in `fetching` state', () => {
          it('does not attempt to fetch new content', () => {
            subject.entriesData = {
              1: {
                published: new Date(1987, 3, 11),
              },
            };
            subject.fetching = true;
            subject.handleInterval();
            expect(subject.handleBlogUpdate).to.not.have.been.called;
          });
        });
      });
    });

    describe('getEntryIdsToFetch', () => {

      it('gets entry ids that are in entriesData, but not in this.entriesStore.all', () => {
        subject.entriesData = {
          1: { published: pastDate },
          2: { published: pastDate },
          3: { published: pastDate },
          4: { published: pastDate },
        };

        subject.entriesStore.all[1] = {};
        subject.entriesStore.all[2] = {};

        expect(subject.getEntryIdsToFetch()).to.eql(['3', '4']);
      });

      it('skips unpublished entries', () => {
        subject.entriesData = {
          1: { published: futureDate },
          2: { published: pastDate },
          3: { published: futureDate },
          4: { published: pastDate },
        };

        expect(subject.getEntryIdsToFetch()).to.eql(['2', '4']);
      });

      it('skips entries that are older than the oldestEntryDate', () => {
        subject.entriesData = {
          1: { published: futureDate },
          2: { published: pastDate },
          3: { published: futureDate },
          4: { published: pastDate },
        };

        subject.entriesStore.oldestEntryDate = currentDate;

        expect(subject.getEntryIdsToFetch()).to.eql([]);
      });

      it('tolerates oldestEntryDate being blank', () => {
        subject.entriesData = {
          1: { published: futureDate },
          2: { published: pastDate },
          3: { published: futureDate },
          4: { published: pastDate },
        };

        delete subject.entriesStore.oldestEntryDate;

        expect(subject.getEntryIdsToFetch()).to.eql(['2', '4']);
      });
    });

    describe('handleClick', () => {
      context('clicked on `button.liveblog-new-entries`', () => {
        beforeEach((done) => {
          subject.handleBlogFetchSuccess(`
              <bulbs-liveblog-entry
                entry-id="1234"
                entry-published="${(new Date()).toISOString()}">
              </bulbs-liveblog-entry>
          `);
          setImmediate(() => done());
        });

        it('handles showing new entries', () => {
          sandbox.spy(subject, 'showNewEntries');
          let newEntry = document.createElement('bulbs-liveblog-entry');
          newEntry.setAttribute('entry-id', 1);
          newEntry.setAttribute('entry-published', pastDate);
          let newEntries = [newEntry];
          let button = document.createElement('button');
          button.classList.add('liveblog-new-entries');
          button.newEntries = newEntries;

          subject.handleClick({
            target: button,
          });

          expect(subject.showNewEntries).to.have.been.calledWith();
        });
      });

      context('clicked on `button.liveblog-entry-reset`', () => {
        it('handles resetting the selected entry', () => {
          sandbox.spy(subject, 'resetSelectedEntry');
          let button = document.createElement('button');
          button.classList.add('liveblog-entry-reset');

          subject.handleClick({
            target: button,
          });

          expect(subject.resetSelectedEntry).to.have.been.called;
        });
      });
    });

    describe('showNewEntries', () => {
      let entry1 = document.createElement('bulbs-liveblog-entry');
      entry1.setAttribute('entry-id', 1);
      entry1.setAttribute('entry-published', pastDate);
      let entry2 = document.createElement('bulbs-liveblog-entry');
      entry2.setAttribute('entry-id', 2);
      entry2.setAttribute('entry-published', pastDate);

      beforeEach((done) => {
        subject.handleBlogFetchSuccess(`
            <bulbs-liveblog-entry
              entry-id="1234"
              entry-published="${(new Date()).toISOString()}">
            </bulbs-liveblog-entry>
        `);
        setImmediate(() => done());
      });

      it('removes the show new entries button', () => {
        sandbox.spy(subject, 'removeNewEntriesButton');
        subject.showNewEntries([entry1]);
        expect(subject.removeNewEntriesButton).to.have.been.called;
      });

      it('places the entries in the entries container', () => {
        subject.entryStaging.appendChild(entry1);
        subject.entryStaging.appendChild(entry2);
        subject.showNewEntries();
        expect(subject.entriesContainer[0].contains(entry1)).to.be.true;
        expect(subject.entriesContainer[0].contains(entry2)).to.be.true;
      });

      xit('scrolls to the new entries', () => {

      });

      xit('runs the picturefill', () => {

      });

      xit('emits liveblog-content-loaded event', () => {

      });
    });

    describe('resetSelectedEntry', () => {
      it('removes the .liveblog-entry-shared class from the entry', () => {
        expect(subject.querySelectorAll('.liveblog-entry-shared').length).to.eql(1);
        subject.resetSelectedEntry();
        expect(subject.querySelectorAll('.liveblog-entry-shared').length).to.eql(0);
      });
    });

    describe('handleBlogUpdate', () => {
      beforeEach(() => {
        fetchMock.mock('http://example.org/path/to/liveblog?entry_ids=1,2,3', {});
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('fetches new content for the given entry ids', () => {
        subject.handleBlogUpdate([1, 2, 3]);
        expect(fetchMock.called(
          'http://example.org/path/to/liveblog?entry_ids=1,2,3'
        )).to.be.true;
      });

      it('records that liveblog is fetching new content', () => {
        subject.handleBlogUpdate([1, 2, 3]);
        expect(subject.fetching).to.be.true;
      });
    });

    describe('handleBlogFetchSuccess', () => {
      let fetchSuccessContent = `
        <bulbs-liveblog-entry
          entry-id="789"
          entry-published="${pastDate}"
        >
        </bulbs-liveblog-entry>

        <bulbs-liveblog-entry
          entry-id="456"
          entry-published="${pastDate}"
        >
        </bulbs-liveblog-entry>
      `;

      it('adds the new content to the staging area', () => {
        subject.handleBlogFetchSuccess(fetchSuccessContent);
        expect(subject.entryStaging.querySelectorAll('bulbs-liveblog-entry').length).to.eql(2);
      });

      it('displays a button to show the new entries', () => {
        expect(subject.querySelector('button.liveblog-new-entries')).to.be.null;
        subject.handleBlogFetchSuccess(fetchSuccessContent);
        expect(subject.querySelector('button.liveblog-new-entries')).to.not.be.null;
      });

      it('records that the liveblog is no longer fetching content', () => {
        subject.fetching = true;
        subject.handleBlogFetchSuccess(fetchSuccessContent);
        expect(subject.fetching).to.be.false;
      });
    });

    describe('handleBlogFetchError', () => {
      it('records that the liveblog is no longer fetching content', () => {
        subject.fetching = true;
        subject.handleBlogFetchError();
        expect(subject.fetching).to.be.false;
      });
    });

    describe('removeNewEntriesButton', () => {
      it('removes the show new entries button', () => {
        let button = document.createElement('button');
        button.classList.add('liveblog-new-entries');
        subject.entriesContainer[0].appendChild(button);
        expect(subject.querySelector('button.liveblog-new-entries')).not.to.be.null;
        subject.removeNewEntriesButton();
        expect(subject.querySelector('button.liveblog-new-entries')).to.be.null;
      });
    });
  });
});
