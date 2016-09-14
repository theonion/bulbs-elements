import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { filterBadResponse } from 'bulbs-elements/util';
import invariant from 'invariant';
import firebase from 'firebase/app';
import 'firebase/database';
import scrollToElement from 'scroll-to-element';

function makeNewEntriesButton (newEntries) {
  let button = document.createElement('button');
  button.classList.add('liveblog-new-entries');
  button.innerHTML = `Show ${newEntries.length} New Articles`;
  button.newEntries = newEntries;
  return button;
}

function parseEntry (entry) {
  if ('published' in entry) {
    entry.published = new Date(entry.published);
  }

  return entry;
}

const LIVEBLOG_LATENCY = 5000;

export const allEntries = {};
class BulbsLiveblogEntry extends BulbsHTMLElement {
  createdCallback () {
  }

  attachedCallback () {
    invariant(this.hasAttribute('entry-id'),
       '<bulbs-liveblog-entry> element MUST specify an `entry-id` attribute');

    allEntries[this.getAttribute('entry-id')] = this;
  }

  detachedCallback () {
    delete allEntries[this.getAttribute('entry-id')];
  }
}

registerElement('bulbs-liveblog-entry', BulbsLiveblogEntry);

class BulbsLiveblog extends BulbsHTMLElement {
  debug (...message) {
    console.log('<bulbs-liveblog>', ...message);
  }

  attachedCallback () {
    invariant(this.hasAttribute('firebase-path'),
      '<bulbs-liveblog> element MUST specify a `firebase-path` attribute');

    invariant(this.hasAttribute('firebase-url'),
      '<bulbs-liveblog> element MUST specify a `firebase-url` attribute');

    invariant(this.hasAttribute('firebase-api-key'),
      '<bulbs-liveblog> element MUST specify a `firebase-api-key` attribute');

    invariant(this.hasAttribute('liveblog-url'),
      '<bulbs-liveblog> element MUST specify a `liveblog-url` attribute');

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
  }

  detachedCallback () {
    this.teardownFirebase();
    this.teardownInterval();
  }

  setupFirebase () {
    let firebaseAppConfig = {
      apiKey: this.getAttribute('firebase-api-key'),
      databaseURL: this.getAttribute('firebase-url'),
    };
    let firebaseAppName = `liveblog-${this.getAttribute('liveblog-id')}`;

    this.firebaseApp = firebase.initializeApp(firebaseAppConfig, firebaseAppName);
    this.firebaseDatabase = this.firebaseApp.database();
    this.firebaseRef = this.firebaseDatabase
                        .ref(this.getAttribute('firebase-path'))
                        .orderByChild('published')
                        .limitToLast(100);
  }

  setupInterval () {
    this.interval = setInterval(this.handleInterval.bind(this), LIVEBLOG_LATENCY);
  }

  setupEvents () {
    this.addEventListener('click', this.handleClick.bind(this));
    this.firebaseRef.on('value', this.handleFirebaseValue.bind(this));
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
    this.debug('handleFirebaseValue:', this.entriesData);
  }

  handleInterval () {
    this.debug('handleInterval');
    if (this.fetching) {
      this.debug('handleInterval: bailing out: already fetching data');
      return;
    }
    let now = new Date();
    let entryIds = [];
    Object.keys(this.entriesData).forEach((entryId) => {
      let entry = this.entriesData[entryId];
      if (entry.published < now && !allEntries[entryId]) {
        entryIds.push(entryId);
      }
    });

    if (entryIds.length) {
      this.debug('handleInterval: entryIds', entryIds);
      this.handleBlogUpdate(entryIds);
    }
  }

  handleClick (event) {
    if (event.target.matches('button.liveblog-new-entries')) {
      this.showNewEntries(event.target.newEntries);
    }

    if (event.target.matches('button.liveblog-entry-reset')) {
      this.resetSelectedEntry();
    }
  }

  showNewEntries (newEntries) {
    this.removeNewEntriesButton();
    while (event.target.newEntries[0]) {
      this.entriesContainer[0].prepend(event.target.newEntries[0]);
    }
    scrollToElement(this.entriesContainer[0].childNodes[0], {
      duration: 500,
    });
    this.entriesContainer[0].childNodes[0].scrollIntoView();
    window.picturefill();
  }

  resetSelectedEntry () {
    document.querySelector('.liveblog-entry-shared').classList.remove('liveblog-entry-shared');
  }

  handleBlogUpdate (entryIds) {
    this.debug('handleBlogUpdate ', url);
    let url = `${this.getAttribute('liveblog-url')}?entry_ids=${entryIds.join(',')}`;
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
    this.entryStaging.innerHTML += htmlText;

    // <noscript> tag are parsed by DOMParser
    //
    //  Our picturefill does a query to find an <img> tag, and it finds the img
    //  inside the <noscript> tag. This is bad. So we have to manually remove the
    //   <noscript> elements.
    //
    //  Things get extra weird, we can't use the [].prototype.forEach hack here.
    //  So, while there is a first <noscript> element, we remove it.
    //  getElementsByTagName is a live  collection, so once we have removed each
    //  item, it will no longer be in the collection.
    let noscripts = this.entryStaging.getElementsByTagName('noscript');
    while (noscripts[0]) {
      noscripts[0].remove();
    }
    let newEntries = this.entryStaging.getElementsByTagName('bulbs-liveblog-entry');
    this.removeNewEntriesButton();
    if (newEntries.length > 0) {
      let newEntriesButton = makeNewEntriesButton(newEntries);
      this.entriesContainer[0].prepend(newEntriesButton);
    }
  }

  removeNewEntriesButton () {
    [].forEach.call(this.newEntriesButtons, (button) => button.remove());
  }

  handleBlogFetchError (error) {
    this.fetching = false;
    console.error(error);
  }
}

registerElement('bulbs-liveblog', BulbsLiveblog);
