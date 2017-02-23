export default {
  element: 'bulbs-tabs',
  examples: {
    'Normal Tabs': {
      render () {
        return `
          <style>
            body {
              background-color: #fafafa;
            }
            bulbs-tab-content {
              background: white;
              min-height: 300px;
            }
          </style>
          <bulbs-tabs>
            <bulbs-tab-strip>
              <bulbs-tab-item tab-name="newswire">
                NEWSWIRE
              </bulbs-tab-item>

              <bulbs-tab-item tab-name="greatjobinternet">
                GREAT JOB, INTERNET!
              </bulbs-tab-item>

              <div>Share On Twitter!</div>
            </bulbs-tab-strip>

            <bulbs-tab-content tab-name="newswire">
              NEWSWIRE
            </bulbs-tab-content>

            <bulbs-tab-content tab-name="greatjobinternet">
              GREAT JOB, INTERNET
            </bulbs-tab-content>
          </bulbs-tabs>
        `;
      },
    },
  },
};
