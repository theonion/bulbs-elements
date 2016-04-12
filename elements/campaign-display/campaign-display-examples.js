let examples = {
  element: 'campaign-display',
  examples: {
    'Basic Example': {
      render() {
        return `
          <campaign-display
            display="name" campaign={
              {
                name: 'Example Campaign',
                clickthrough_url: 'http://example.com',
                image_url: 'http://lorempixel.com/480/340',
              }
            }
          >
          </campaign-display
        `;
      },
    },
  },
};

export default examples;
