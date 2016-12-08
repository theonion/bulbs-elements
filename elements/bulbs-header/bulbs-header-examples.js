import './bulbs-header-example.scss';

let examples = {
  element: 'bulbs-header',
  examples: {
    'Bulbs Header': {
      render: () => {
        return `
          <bulbs-header>
            <bulbs-header-masthead>
              <button
                is="bulbs-flyover-open"
                menu-name="example-menu"
                style="
                  padding: 1rem;
                  display: block;
                "
              >
                <i class="fa fa-bars" aria-hidden="true"></i>
              </button>
              <span>Bulbs Header Masthead</span>
            </bulbs-header-masthead>
            <bulbs-header-responsive-nav>
              <button
                is="bulbs-flyover-open"
                menu-name="example-menu"
                style="
                  padding: 1rem;
                  display: block;
                "
              >
                <i class="fa fa-bars" aria-hidden="true"></i>
              </button>
              <span>Bulbs Header Responsive Nav</span>
            </bulbs-header-responsive-nav>
          </bulbs-header>
          <bulbs-flyover-menu menu-name="example-menu">
            <button is="bulbs-flyover-close" menu-name="example-menu">
              +
            </button>

            <h2>
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

export default examples;
