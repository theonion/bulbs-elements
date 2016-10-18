export default {
  element: 'lazy-template',
  examples: {
    'Load On Page Load': {
      render () {
        return `
          <script type="text/html" is="lazy-template" load-on="page-load">
            <h1>Damn Son, I Am Lazy Loaded</h1>
            <img src="http://www.fillmurray.com/g/200/300" alt="Billy Murray">
          </script>
        `;
      },
    },
    'Load On In View': {
      render () {
        return `
          <div
            style="
              overflow: auto;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
            "
          >
            <div style="height: 200%">SCROLL DOWN TO LOAD STUFF</div>
            <script type="text/html" is="lazy-template" load-on="in-view">
              <h1>Damn Son, I Am Lazy Loaded</h1>
              <img src="http://www.fillmurray.com/g/200/300" alt="Billy Murray">
            </script>
          </div>
        `;
      },
    },
  },
};
