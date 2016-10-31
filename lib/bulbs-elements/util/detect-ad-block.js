export default function detectAdBlock() {
  let adBlockCheckElement = document.createElement('img');
  adBlockCheckElement.id = 'ad-block-check';
  adBlockCheckElement.src = '//http://assets3.onionstatic.com/onionstatic/onion/static/images/ad-block-check.jpg';
  document.body.appendChild(adBlockCheckElement);
  setTimeout(function() { 
    if (adBlockCheckElement.style.display == 'none') {
      console.log('true');
      return true;
    }
  }, 200);
}