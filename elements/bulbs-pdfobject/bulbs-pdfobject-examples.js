import './bulbs-pdfobject-example.scss';

let examples = {
  element: 'bulbs-pdfobject',
  examples: {
    'Bulbs PDFObject': {
      render: () => {
        return `
          <bulbs-pdfobject src="https://s3.amazonaws.com/onionstatic/onion/custom/trump-docs/TD-Day1-TrumpAirForceOne.pdf" poster="https://s3.amazonaws.com/onionstatic/onion/custom/trump-docs/af1.png"></bulbs-pdfobject>
        `;
      },
    },
  },
};

export default examples;
