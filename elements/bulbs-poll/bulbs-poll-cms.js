import {
  registerElement,
  EmbededCMSElement,
} from 'bulbs-elements/register';

let promiseCache = {};
let previewDataCache = {};
function getPreviewData(src, callback) {
  promiseCache[src] || (promiseCache[src] = fetch(src).then((response) => response.json()));
  promiseCache[src].then((data) => {
    previewDataCache[src] = data;
    callback(data);
  });
}

class EmbeddedBulbsPoll extends EmbededCMSElement {
  get embedContentPreview() {
    let src = this.getAttribute('src');
    let title = '';
    if (src) {
      if (previewDataCache[src]) {
        title = previewDataCache[src].title;
      }
      else {
        getPreviewData(src, (data) => {
          this.querySelector('h1').innerHTML += ` ${data.title}`;
        });
      }
    }
    return `
      <h1 style='text-align: center; font-family: "Droid Serif"'>
        <i class='fa fa-th-list'></i>
        Embedded Poll: ${title}
      </h1>
    `;
  }
}

registerElement('bulbs-poll', EmbeddedBulbsPoll);
