import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { filterBadResponse } from 'bulbs-elements/util';
import {
  getFirebaseDB,
} from './util';

function parseResponse (response) {
  if ('last_modified' in response) {
    response.last_modified = new Date(Date.parse(response.last_modified));
  }

  return response;
}

class BulbsLiveblogResponses extends BulbsHTMLElement {
  currentResponseIds () {
    return [].map.call(this.querySelectorAll('bulbs-liveblog-responses > .liveblog-response'), (response) => {
      return response.getAttribute('liveblog-response-id');
    });
  }

  makeNewResponsesButton () {
    let button = document.createElement('button');
    let newResponses = this.responseStaging.children;
    let currentResponses = this.querySelectorAll('bulbs-liveblog-responses > .liveblog-response');
    let newResponsesCount = newResponses.length - currentResponses.length;
    button.classList.add('liveblog-new-responses');
    button.setAttribute('data-track-action', 'Alert: New Responses');
    button.setAttribute('data-track-label', '#');
    button.innerHTML = `
      Show ${newResponsesCount} New Response${newResponsesCount > 1 ? 's' : ''}
    `;
    return button;
  }

  attachedCallback () {
    this.requireAttribute('firebase-path');
    this.requireAttribute('firebase-url');
    this.requireAttribute('firebase-api-key');
    this.requireAttribute('liveblog-new-responses-url');
    this.requireAttribute('liveblog-id');

    this.bindHandlers();

    this.setupFirebase();
    this.setupEvents();

    this.newResponsesButtons = this.getElementsByClassName('liveblog-new-responses');

    if (!this.responseStaging) {
      this.responseStaging = document.createElement('div');
      this.responseStaging.classList.add('response-staging');
      this.responseStaging.style.display = 'none';
      this.append(this.responseStaging);
    }

    this.responsesData = {};
  }

  detachedCallback () {
    this.removeEventListener('click', this.handleClick);
    this.firebaseRef.off('value', this.handleFirebaseValue);
  }

  bindHandlers () {
    this.handleClick = this.handleClick.bind(this);
    this.handleFirebaseValue = this.handleFirebaseValue.bind(this);
  }

  setupFirebase () {
    let dbConfig = {
      apiKey: this.getAttribute('firebase-api-key'),
      databaseURL: this.getAttribute('firebase-url'),
    };
    let dbName = `liveblog-${this.getAttribute('liveblog-id')}`;
    this.firebaseDatabase = getFirebaseDB(dbConfig, dbName);
    this.firebaseRef = this.firebaseDatabase
                        .ref(this.getAttribute('firebase-path'))
                        .orderByChild('published');
  }

  setupEvents () {
    this.addEventListener('click', this.handleClick);
    this.firebaseRef.on('value', this.handleFirebaseValue);
  }

  handleFirebaseValue (snapshot) {
    this.responsesData = snapshot.val() || {};
    Object.keys(this.responsesData).forEach((responseId) => {
      parseResponse(this.responsesData[responseId]);
    });
    this.maybeFetchNewResponses();
  }

  maybeFetchNewResponses () {
    if (this.fetching) {
      return;
    }

    let nextResponseIds = this.getResponseIdsToFetch();
    let currentResponseIds = this.currentResponseIds();
    let newIds = nextResponseIds.sort().toString() !== currentResponseIds.sort().toString();
    if (newIds && nextResponseIds.length > 0) {
      this.handleResponsesUpdate(nextResponseIds);
    }
  }

  getResponseIdsToFetch () {
    let ids = [];
    Object.keys(this.responsesData).forEach((responseId) => {
      let response = this.responsesData[responseId];
      if (response.published) {
        ids.push(responseId);
      }
    });
    return ids;
  }

  handleClick () {
    if (event.target.matches('button.liveblog-new-responses')) {
      this.showNewResponses();
    }
  }

  handleResponsesUpdate (responseIds) {
    let url = `${this.getAttribute('liveblog-new-responses-url')}?response_ids=${responseIds.join(',')}`;
    this.fetching = true;
    fetch(url, { credentials: 'include' })
      .then(filterBadResponse)
      .then(response => response.text())
      .then(this.handleFetchSuccess.bind(this))
      .catch(this.handleFetchError.bind(this))
    ;
  }

  showNewResponses () {
    this.removeNewResponsesButton();
    [].forEach.call(
      this.querySelectorAll('bulbs-liveblog-responses > .liveblog-response'),
      (child) => { child.remove(); }
    );
    while (this.responseStaging.firstElementChild) {
      this.append(this.responseStaging.firstElementChild);
    }
    window.picturefill();
    if (twttr) {              // eslint-disable-line no-undef
      twttr.widgets.load();  //  eslint-disable-line no-undef
    }
  }

  handleFetchSuccess (htmlText) {
    this.fetching = false;

    this.removeNewResponsesButton();

    if (!htmlText.trim()) {
      // there's nothing in the response, do no work
      return;
    }

    let parser = document.createElement('div');
    parser.innerHTML = htmlText;
    this.responseStaging.innerHTML = '';
    while (parser.firstElementChild) {
      this.responseStaging.append(parser.firstElementChild);
    }
    let newResponsesButton = this.makeNewResponsesButton();
    this.append(newResponsesButton);
  }

  removeNewResponsesButton () {
    [].forEach.call(this.newResponsesButtons, (button) => button.remove());
  }

  handleFetchError () {
    this.fetching = false;
  }
}

registerElement('bulbs-liveblog-responses', BulbsLiveblogResponses);
