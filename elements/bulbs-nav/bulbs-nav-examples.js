export default {
  element: 'bulbs-nav-*',
  examples: {
    'Simple Nav Bar': {
      render () {
        return `
          <nav
            style="
              display: flex;
            "
          >
            <bulbs-nav-toggle nav-name="alpha">Nav A</bulbs-nav-toggle>
            <bulbs-nav-toggle nav-name="numero">Nav 2</bulbs-nav-toggle>
            <bulbs-nav-toggle nav-name="omega">Nav Ω</bulbs-nav-toggle>
          </nav>

          <bulbs-nav-panel nav-name="alpha">
            Alpha Nav Panel
          </bulbs-nav-panel>

          <bulbs-nav-panel nav-name="numero">
            Numero Nav Panel
          </bulbs-nav-panel>

          <bulbs-nav-panel nav-name="omega">
            Omega Nav Panel
          </bulbs-nav-panel>
        `;
      },
    },
  },
};
