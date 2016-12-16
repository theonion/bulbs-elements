let examples = {
  element: 'bulbs-pinned-element',
  examples: {
    'Basic Example': {
      render: () => {
        return `
          <div
              style="
                background-color: blue;
                height: 1000px;
                width: 200px;
              "
              >
            <bulbs-pinned-element scroll-container-selector=".examples-index-pane">
              <div>this is pinned content!</div>
            </bulbs-pinned-element>
          </div>
        `;
      },
    },
  },
};

export default examples;
