export default function detectAdBlock (callback) {

  var adBlockCheck = document.createElement('img');
  adBlockCheck.id = 'adBlockCheck';
  adBlockCheck.src = '//assets3.onionstatic.com/onionstatic/onion/static/images/ad-block-check.jpg';
  document.body.appendChild(adBlockCheck);

  function isAdBlocked() {
    setTimeout(function () { 
      if(adBlockCheck.style.display === 'none') {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    }, 100);
  }

  setImmediate(() => {
    callback(isAdBlocked());
  });

}