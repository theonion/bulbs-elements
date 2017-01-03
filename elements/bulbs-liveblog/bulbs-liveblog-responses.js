import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { filterBadResponse } from 'bulbs-elements/util';
import {
  getFirebaseDB,
} from './util';

function parseResponse (response) {
  if ('published' in response) {
    response.published = new Date(Date.parse(response.published));
  }

  return response;
}

class BulbsLiveblogResponses extends BulbsHTMLElement {
  attachedCallback () {
    this.requireAttribute('firebase-path');
    this.requireAttribute('firebase-url');
    this.requireAttribute('firebase-api-key');
    this.requireAttribute('liveblog-new-entries-url');
    this.requireAttribute('liveblog-id');

    this.responseStaging = document.createElement('div');
    this.responseStaging.style.display = 'none';
    this.append(this.responseStaging);
  }

  setupFirebase () {
    this.firebaseDatabase = getFirebaseDB({
      apiKey: this.getAttribute('firebase-api-key'),
      databaseURL: this.getAttribute('firebase-url'),
    },
      `liveblog-${this.getAttribute('liveblog-id')}`
    );
    this.firebaseRef = this.firebaseDatabase
                        .ref(this.getAttribute('firebase-path'))
                        .orderByChild('published');
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

    let responseIds = this.getResponseIdsToFetch();
    if (responseIds.length) {
      this.handleResponsesUpdate(responseIds);
    }
  }

  handleResponsesUpdate (responseIds) {
    let url = `${this.getAttribute('responses-url')}?response_ids=${responseIds.join(',')}`;
    this.fetching = true;
    fetch(url, { credentials: 'include' })
      .then(filterBadResponse)
      .then(response => response.text())
      .then(this.handleFetchSuccess.bind(this))
      .catch(this.handleFetchError.bind(this))
    ;
  }

  handleFetchSuccess (htmlText) {
    this.fetching = false;
    let parser = document.createElement('div');
    parser.innerHTML = htmlText;
    while (parser.firstElementChild) {
      this.responseStaging.append(parser.firstElementChild);
    }
    this.removeNewResponsesButton();
    if (this.newResponses.Length) {
      let newResponsesButton = this.makeNewResponsesButton();
      this.responsesContainer[0].prepend(newResponsesButton);
    }
  }

  handleFetchError () {
    this.fetching = false;
  }
}

registerElement('bulbs-liveblog-responses', BulbsLiveblogResponses);
