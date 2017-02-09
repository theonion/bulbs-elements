let examples = {
  element: 'bulbs-article-body',
  examples: {
    'Article Body Dingbat': {
      render () {
        return `
          <style>
            .explainer {
              font-family: monospace;
              font-weight: bold;
              padding: 20px;
            }

            .explainer::after {
              border-bottom: 2px solid #ccc;
              content: ' ';
              display: block;
              margin-top: 10px;
            }

            .bulbs-article-body-example {
              max-width: 600px;
              margin: auto;
              padding: 20px;
            }

            .bulbs-article-body-example p {
              margin-bottom: 10px;
            }

            .bulbs-article-body-example .site-dingbat {
              background-color: red;
              display: inline-block;
              height: 1em;
              margin-left: 5px;
              vertical-align: middle;
              width: 1em;
            }
          </style>

          <div class="explainer">
            <h2>Article Body Dingbat</h2>
            <p>A span with the css class .site-dingbat is added to the end of bulbs-article-body. In this example .site-dingbat is a red box, but it can be styled in any way.</p>
          </div>

          <div class="bulbs-article-body-example">
            <h3>So My Readers Wish Me Dead</h3>
            <h4><i>T. Herman Zweibel</i></h4>
            <div
                is="bulbs-article-body">
              <p>I am informed by The Onion Editorial Board that the mountain of mail calling for my death is increasing once again. This is nothing new, as it becomes fashionable to lust for the death of T. Herman Zweibel when-ever the Swiss economy is running smoothly. It does not pay to anger the Gnomes of Zurich!</p>

              <p>However, there is a new and unusual thread running through the winding-sheet of public opinion. My spine-less readers, apparently sapped of all gumption by their various labor-saving devices and lye-free soaps, seem to think I should be euthanized by the editors of The Onion news-paper!</p>

              <p>What is with the citizens now-a-days? In my youth, when a reader wished me dead, he did not go whining to the various figure-heads of my staff–he attempted to assassinate me him-self!</p>

              <p>How the musketry would ring about my ears as I strode the board-walk! Why, a 1907 trip to New-York was made memorable only by the presence of a fat Polack, perched in the torch of the Statue of Liberty, attempting to crease my straw boater with a Henry repeating carbine! Of course, I had the Polack shipped off to Roarke's Drift and the degenerate French statue chopped into pennies.</p>

              <p>At the otherwise stultifying Columbian Exposition, I was the quarry of no fewer than 11 determined and resourceful assassins, one of whom gave rise to the term "Vagina Dentata." My Swiss Guard were kept much busier back then. The glitter and ring of their thrashing halberds were like star-shine and bell-chimes!</p>

              <p>But you lazy puddings wish the editors of my news-paper to perform a task for which you have no stomach! I myself have no stomach, having shat it forth gobbet by gobbet over the course of the last few decades. But were I to wish you dead, I would stand toe to toe with you, look you in the eye, and order you killed my-self!</p>

              <p>You nattering hens should also know that many years ago, The Onion Editorial Board did once attempt to carry out my demise. It was foolish and suicidal, for even if they had succeeded, their first-born would have paid with their lives. But I had a son on the board, and for some reason, Q. Euclid chose to inform me of their plot. I had the conspirators drowned in cater-pillars, Q. Euclid included, and to this day I maintain a tight leash of fear on all my poor scriveners. Do not, there-fore, ask them to kill me off. Do it your-self or get back to work!</p>
            </div>
          </div>
        `;
      },
    },
  },
};

export default examples;
