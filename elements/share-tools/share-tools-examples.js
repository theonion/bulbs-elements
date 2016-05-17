export default {
  element: 'share-tools',
  examples: {
    'Icon and Label': {
      render: () => {
        return `
          <share-tools
            share-url='http://example.org/cool-url'
            share-title='This is SO COOOL'
          >
            <share-via-facebook icon label></share-via-facebook>
            <share-via-twitter twitter-handle='realTwitterUser' icon label></share-via-twitter>
            <share-via-email message='Message' icon label></share-via-email>
          </share-tools>
        `;
      },
    },
    'Icon Only': {
      render: () => {
        return `
          <share-tools
            share-url='http://example.org/cool-url'
            share-title='This is SO COOOL'
          >
            <share-via-facebook icon></share-via-facebook>
            <share-via-twitter twitter-handle='realTwitterUser' icon></share-via-twitter>
            <share-via-email message='Message' icon></share-via-email>
          </share-tools>
        `;
      },
    },
    'Label Only': {
      render: () => {
        return `
          <share-tools
            share-url='http://example.org/cool-url'
            share-title='This is SO COOOL'
          >
            <share-via-facebook label></share-via-facebook>
            <share-via-twitter twitter-handle='realTwitterUser' label></share-via-twitter>
            <share-via-email message='Message' label></share-via-email>
          </share-tools>
        `;
      },
    },
  },
};
