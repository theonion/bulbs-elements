export default {
  element: 'lazy-iframe',
  examples: {
    'Above The Fold': {
      render: () => {
        return `
          <lazy-iframe src="http://example.org/">
          </lazy-iframe>
        `;
      },
    },
    'Scroll To it': {
      render: () => {
        return `
          <div
            style="
              position: fixed;
              top: 0;
              right: 0;
              background: white;
            "
          >
            <h1>Scroll Down To Load Iframe</h2>
            <span>It hasn&rsquo;t loaded yet</span>
          </div>
          <div
            style="
              margin-top: 200%;
            "
          >
            <lazy-iframe src="http://example.org/">
            </lazy-iframe>
          </div>
        `;
      },
      before: (container) => {
        container.addEventListener('load', () => {
          container.querySelector('span').innerText = 'It loaded!';
          container.querySelector('span').style.backgroundColor = 'green';
        }, true);
      },
    },
  },
};

