import './bulbs-pdfobject-example.scss';

let examples = {
  element: 'bulbs-pdfobject',
  examples: {
    'Bulbs PDFObject': {
      render: () => {
        return `
          <bulbs-pdfobject 
            src="https://assets2.onionstatic.com/onion/custom/trump-docs/scans/01-Donald-Trump/1-Trump_Encrypted_Emails_SCAN.pdf" 
            poster="https://assets2.onionstatic.com/onion/custom/trump-docs/poster/01-Donald-Trump/1-Trump_Encrypted_Emails_POSTER.png">
          </bulbs-pdfobject>
        `;
      },
    },
  },
};

export default examples;
