export default {
  element: 'bulbs-flyover-menu',
  examples: {
    'Real Cool Menu': {
      render () {
        return `
          <button
            is="bulbs-flyover-open"
            menu-name="example-menu"
            style="
              margin: 1rem;
              display: block;
            "
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </button>
          <bulbs-flyover-menu menu-name="example-menu">
            <button is="bulbs-flyover-close" menu-name="example-menu">
              +
            </button>

            <h1>
              HOT LINKS
            </h2>
            <p>
              GET YOUR HOT LINKS RIGHT HERE
            </p>

            <nav
              style="
                display: flex;
                flex-direction: column;
              "
            >
              <a href="#">Hot</a>
              <a href="#">Red Hot</a>
              <a href="#">Super Hot</a>
              <a href="#">Hot Hot Hot</a>
              <a href="#">It's A Hot One</a>
            </div>
          </bulbs-flyover-menu>
        `;
      },
    },
  },
};
