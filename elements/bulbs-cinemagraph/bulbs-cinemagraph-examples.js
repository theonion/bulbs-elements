export default {
  element: 'bulbs-cinemagraph',
  examples: {
    'out of view': {
      render () {
        return `
          <div
            style="
              height: 2000px;
            "
          >
          </div>
          <video
            is="bulbs-cinemagraph"
            cinemagraph-duration="1.55"
            src="//v.theonion.com/onionstudios/video/4307/640.mp4"
          />
        `;
      },
    },
    '[src] attribute': {
      render () {
        return `
          <video
            is="bulbs-cinemagraph"
            cinemagraph-duration="1.55"
            src="//v.theonion.com/onionstudios/video/4307/640.mp4"
          />
        `;
      },
    },
    '<source> element': {
      render () {
        return `
          <video
            is="bulbs-cinemagraph"
            cinemagraph-duration="1.55"
          >
            <source src="//v.theonion.com/onionstudios/video/4307/640.mp4"/>
          </video>
        `;
      },
    },
  },
};
