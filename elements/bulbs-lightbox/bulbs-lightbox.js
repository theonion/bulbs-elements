import {
  BulbsHTMLElement,
  registerElement,
} from 'bulbs-elements/register';

class BulbsLightBox extends BulbsHTMLElement {

  attachedCallback () {

    if (this) {

      var overlay = this.querySelector('.bulbs-lightbox-overlay');
      
      function toggleOverlay() {
        if(this.classList.contains('active')) {
          this.classList.remove('active');
        }
        else if(!this.classList.contains('active')){
          this.classList.add('active');
        }
      }

      // Close overlay with Esc key
      $(document).keyup(function(e) {
        if (e.keyCode == 27) overlay.classList.remove('active');
      });

      this.addEventListener('click', toggleOverlay);

    }
  }
}

registerElement('bulbs-lightbox', BulbsLightBox);

export default BulbsLightBox;
