import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import { filterBadResponse } from 'bulbs-elements/util';
import * as scrollToElement from 'scroll-to-element';
import {
  getFirebaseDB,
} from './util';

import './bulbs-liveblog-entry';
import './bulbs-liveblog-responses';

function parseEntry (entry) {
  if ('published' in entry) {
    entry.published = new Date(Date.parse(entry.published));
  }

  return entry;
}

const LIVEBLOG_LATENCY = 5000;

class BulbsLiveblog extends BulbsHTMLElement {
  makeNewEntriesButton () {
    let { newEntries } = this;
    let button = document.createElement('button');
    button.classList.add('liveblog-new-entries');
    button.setAttribute('data-track-action', 'Alert: Show More');
    button.setAttribute('data-track-label', '#');
    button.innerHTML = `
      Show ${newEntries.length} New Article${newEntries.length > 1 ? 's' : ''}
    `;
    let dismiss = document.createElement('span');
    dismiss.classList.add('liveblog-dismiss-new-entries');
    dismiss.setAttribute('data-track-action', 'Alert: Show More');
    dismiss.setAttribute('data-track-label', '#');
    dismiss.innerHTML = '&times;';
    dismiss.addEventListener('click', () => button.remove());
    button.appendChild(dismiss);
    return button;
  }

  createdCallback () {
    this.entriesStore = {
      all: {},
    };
  }

  get newEntries () {
    // IE11 did not like us caching this element collection.
    //  So we rebuild it whenever we need it.
    return this.entryStaging.getElementsByTagName('bulbs-liveblog-entry');
  }

  attachedCallback () {
    this.requireAttribute('firebase-path');
    this.requireAttribute('firebase-url');
    this.requireAttribute('firebase-api-key');
    this.requireAttribute('liveblog-new-entries-url');
    this.requireAttribute('liveblog-id');

    this.bindHandlers();

    this.setupFirebase();
    this.setupInterval();
    this.setupEvents();

    this.newEntriesButtons = this.getElementsByClassName('liveblog-new-entries');
    this.entryStaging = document.createElement('div');
    this.entryStaging.style.display = 'none';

    this.append(this.entryStaging);

    this.entriesContainer = this.getElementsByClassName('liveblog-entries');
    this.entriesElements = this.getElementsByTagName('liveblog-entry');
    this.entriesData = {};
    this.handleInitialEntries();
  }

  handleInitialEntries () {
    [].forEach.call(this.getElementsByTagName('bulbs-liveblog-entry'), (entry) => {
      this.handleEntryAttached({ target: entry });
    });
  }

  bindHandlers () {
    this.handleInterval = this.handleInterval.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFirebaseValue = this.handleFirebaseValue.bind(this);
  }

  detachedCallback () {
    this.teardownFirebase();
    this.teardownInterval();
  }

  setupFirebase () {
    const dbConfig = {
      apiKey: this.getAttribute('firebase-api-key'),
      databaseURL: this.getAttribute('firebase-url'),
    };
    const dbName = `liveblog-${this.getAttribute('liveblog-id')}`;
    this.firebaseDatabase = getFirebaseDB(dbConfig, dbName);
    this.firebaseRef = this.firebaseDatabase
                        .ref(this.getAttribute('firebase-path'))
                        .orderByChild('published')
                        .limitToLast(100);
  }

  setupInterval () {
    this.interval = setInterval(this.handleInterval, LIVEBLOG_LATENCY);
  }

  setupEvents () {
    this.addEventListener('click', this.handleClick);
    this.firebaseRef.on('value', this.handleFirebaseValue);
  }

  teardownFirebase () {
    this.firebaseRef.off();
  }

  teardownInterval () {
    clearInterval(this.interval);
  }

  handleFirebaseValue (snapshot) {
    this.entriesData = snapshot.val() || {};
    Object.keys(this.entriesData).forEach((entryId) => {
      parseEntry(this.entriesData[entryId]);
    });
    this.handleInterval();
  }

  handleInterval () {
    if (this.fetching) {
      return;
    }

    let entryIds = this.getEntryIdsToFetch();
    if (entryIds.length) {
      console.log('handleBlogUpdate', entryIds);
      this.handleBlogUpdate(entryIds);
    }
  }

  handleEntryAttached (event) {
    let thisEntry = {
      element: event.target,
      published: event.target.published,
      pinned: event.target.hasAttribute('entry-is-pinned'),
    };

    this.entriesStore.all[event.target.getAttribute('entry-id')] = thisEntry;

    // NOTE: consider the case where the oldest is in the initial list and is pinned
    if (!thisEntry.pinned && (!this.entriesStore.oldestEntryDate || thisEntry.published < this.entriesStore.oldestEntryDate)) {
      this.entriesStore.oldestEntryDate = thisEntry.published;
    }
  }

  handleEntryDetached (event) {
    delete this.entriesStore.all[event.target.getAttribute('entry-id')];
  }

  getEntryIdsToFetch () {
    let now = new Date();
    let entryIds = [];
    Object.keys(this.entriesData).forEach((entryId) => {
      let entry = this.entriesData[entryId];
      let entryIsPublished = entry.published && entry.published <= now;
      let entryIsCached = this.entriesStore.all[entryId];
      let entryIsOutOfBounds = entry.published
                                && this.entriesStore.oldestEntryDate
                                && this.entriesStore.oldestEntryDate > entry.published;

      if (entryIsPublished && !entryIsCached && !entryIsOutOfBounds) {
        entryIds.push(entryId);
      }
    });
    return entryIds;
  }

  handleClick (event) {
    if (event.target.matches('button.liveblog-new-entries')) {
      this.showNewEntries();
      this.resetSelectedEntry();
    }

    if (event.target.matches('button.liveblog-entry-reset')) {
      this.resetSelectedEntry();
    }

    if (event.target.matches('span.liveblog-entry-reset-message')) {
      this.resetSelectedEntry();
    }
  }

  showNewEntries () {
    this.removeNewEntriesButton();
    while (this.entryStaging.firstElementChild) {
      this.entriesContainer[0].prepend(this.entryStaging.firstElementChild);
    }
    let header = document.querySelector(this.getAttribute('scroll-offset-selector') || 'header');
    let offset = 0;
    if (header) {
      offset = header.getBoundingClientRect().bottom;
    }
    scrollToElement.default(this.entriesContainer[0].childNodes[0], {
      duration: 250,
      offset: -offset,
    });
    window.picturefill();
  }

  resetSelectedEntry () {
    let sharedEntry = document.querySelector('.liveblog-entry-shared');
    if (sharedEntry) {
      if (sharedEntry.hasAttribute('entry-delete-to-reset')) {
        sharedEntry.remove();
      }
      else {
        sharedEntry.classList.remove('liveblog-entry-shared');
      }
    }
  }

  handleBlogUpdate (entryIds) {
    let url = `${this.getAttribute('liveblog-new-entries-url')}?entry_ids=${entryIds.join(',')}`;
    this.fetching = true;
    fetch(url, { credentials: 'include' })
      .then(filterBadResponse)
      .then((response) => response.text())
      .then(this.handleBlogFetchSuccess.bind(this))
      .catch(this.handleBlogFetchError.bind(this))
    ;
  }

  handleBlogFetchSuccess (htmlText) {
    this.fetching = false;
    let parser = document.createElement('div');
    parser.innerHTML = htmlText;
    while (parser.firstElementChild) {
      this.entryStaging.append(parser.firstElementChild);
    }
    this.removeNewEntriesButton();
    if (this.newEntries.length) {
      let newEntriesButton = this.makeNewEntriesButton();
      this.entriesContainer[0].prepend(newEntriesButton);
    }
  }

  removeNewEntriesButton () {
    [].forEach.call(this.newEntriesButtons, (button) => button.remove());
  }

  handleBlogFetchError () {
    this.fetching = false;
  }
}

registerElement('bulbs-liveblog', BulbsLiveblog);
