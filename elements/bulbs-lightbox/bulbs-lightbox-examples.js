import './bulbs-lightbox-test.scss';

let examples = {
  element: 'bulbs-lightbox',
  examples: {
    'Bulbs LightBox': {
      render: () => {
        return `
          <bulbs-lightbox>
            <img src="//i.onionstatic.com/onion/5620/3/16x9/800.jpg">
            <div class="bulbs-lightbox-overlay">
              <div class="bulbs-lightbox-overlay-inner">
                <img src="//i.onionstatic.com/onion/5620/3/16x9/2400.jpg">
                <div class="bulbs-lightbox-caption">
                  This is a test caption
                </div>
              </div>
            </div>
          </bulbs-lightbox>
        `;
      },
    },
  },
};

export default examples;
