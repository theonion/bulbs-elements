import './bulbs-pdfobject-example.scss';

let examples = {
  element: 'bulbs-pdfobject',
  examples: {
    'Bulbs PDFObject': {
      render: () => {
        return `
          <bulbs-pdfobject src="https://s3.amazonaws.com/onionstatic/onion/custom/trump-docs/pdf-test.pdf"></bulbs-pdfobject>
        `;
      },
    },
  },
};

export default examples;
