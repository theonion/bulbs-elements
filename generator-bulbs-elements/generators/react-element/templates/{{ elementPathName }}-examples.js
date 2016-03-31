let examples = {
  element: '<%= elementName %>',
  examples: {
    'Basic Example': {
      render: function () {
        return `
          <<%= elementName %>
            attribute="value"
          >
          </<%= elementName %>>
        `;
      },
    },
  },
};

export default examples;
