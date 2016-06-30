/* eslint babel/new-cap:0, valid-jsdoc:0 */
const DEFAULTS = {
  alignmentDuration: 300,
  alignmentOffset: -60,
  hashState: false,
  preventFirstAlignment: false,
};

// $.Velocity
//   .RegisterUI('transition.turnPageIn', {
//     defaultDuration: 200,
//     calls: [
//       [{
//         opacity: [1, 0.5],
//         transformPerspective: [800, 800],
//         rotateY: [0, 'easeInQuad', 90],
//       }],
//     ],
//     reset: {
//       transformPerspective: 0,
//     },
//   })
//   .RegisterUI('transition.turnPageOut', {
//     defaultDuration: 200,
//     calls: [
//       [{
//         opacity: [0.5, 1],
//         transformPerspective: [800, 800],
//         rotateY: [-90, 'easeInQuad'],
//       }],
//     ],
//     reset: {
//       transformPerspective: 0,
//       rotateY: 0,
//     },
//   });

const NODE_TRANSITIONS = {
  default: {
    show: {
      fx: 'transition.slideRightIn',
    },
    hide: {
      fx: 'transition.slideLeftOut',
    },
  },
  flipLeft: {
    show: {
      fx: 'transition.turnPageIn',
    },
    hide: {
      fx: 'transition.turnPageOut',
    },
  },
  slideLeft: {
    show: {
      fx: 'transition.slideRightIn',
    },
    hide: {
      fx: 'transition.slideLeftOut',
    },
  },
  slideRight: {
    show: {
      fx: 'transition.slideLeftIn',
    },
    hide: {
      fx: 'transition.slideRightOut',
    },
  },
  slideDown: {
    show: {
      fx: 'transition.slideDownIn',
    },
    hide: {
      fx: 'transition.slideDownOut',
    },
  },
  slideUp: {
    show: {
      fx: 'transition.slideUpIn',
    },
    hide: {
      fx: 'transition.slideUpOut',
    },
  },
};

export default class Clickventure {
  constructor (element, options) {
    let clickventure = this;
    let settings = $.extend({}, DEFAULTS, options);
    let hash = window.location.hash;

    this.element = element;
    this.options = settings;
    this.doAlign = !this.options.preventFirstAlignment;

    this.nodeLinkButtons = this.element.find('.clickventure-node-link-button');
    this.restartButton = this.element.find('.clickventure-node-finish-links-restart');

    this.nodeLinkButtons.each((i, el) => {
      let $element = $(el);
      $element.on('click', () => {
        let $dataContainer = $element.closest('.clickventure-node-link');
        let targetNode = $dataContainer.data('targetNode');
        let transitionName = $dataContainer.data('transition');

        clickventure.gotoNodeId(targetNode, transitionName);
        settings.analyticsManager.trackPageView(false, transitionName);
      });
    });

    this.restartButton.click(this.restart);
    debugger
    if (hash && this.options.hashState) {
      this.gotoHash(hash);
    }
    else {
      this.gotoStartNode();
    }
  }

  restart (event) {
    event.preventDefault();
    this.gotoStartNode();
  }

  /**
   * Align top of clickventure to some offset. First call to this function is
   *  skipped if preventFirstAlignment option is set to true.
   */
  alignWithTop () {
    // align only if preventFirstAlignment is false, or at least one call to this
    //  function has occurred
    if (this.doAlign) {
      // scroll the window to given offset
      this.element.velocity('scroll', {
        duration: this.options.alignmentDuration,
        offset: this.options.alignmentOffset,
      });
    }
    // at least one call has been made, allow all other future calls
    this.doAlign = true;
  }

  /**
   * Send UI to node id with the given node transition provided by given hash.
   *
   * For example, the url "www.clickhole.com/clickventure/my-first-cv-123#5,slideRight"
   *  has the hash "#5,slideRight", which will tell this function to go to node
   *  number 5, with a "slideRight" transition. Note, node name can be used in
   *  place of node id.
   *
   * @param {string} hash - hash string provided in url.
   * @returns undefined
   */
  gotoHash (hash) {
    let cleanHash = hash.substr(1, hash.length - 1);
    let parts = cleanHash.split(',');
    let id = parts[0];

    if (id) {
      let transition = parts[1];
      if (isNaN(id)) {
        this.gotoNodeNamed(id, transition);
      }
      else {
        this.gotoNode(id, transition);
      }
    }
  }

  /**
   * Go to a random start node.
   *
   * @param {string} transitionName - transition to use when going to start node.
   */
  gotoStartNode (transitionName) {
    // find all start nodes and choose a random one to go to
    let startNodes = this.element.find('.clickventure-node-start');
    let node = startNodes[Math.floor(startNodes.length * Math.random())];

    if (node) {
      // have at least one node, go to it
      let nodeId = $(node).data('nodeId');
      if (nodeId) {
        this.gotoNodeId(nodeId, transitionName);
      }
    }
  }

  /**
   * Go to a node by name.
   *
   * @param {string} name - name of node to go to.
   * @param {string} transitionName - name of transition to use when going to node.
   */
  gotoNodeNamed (name, transitionName) {
    // find node with given name
    let node = this.element.find('[data-node-name="' + name + '"]');

    if (node.length) {
      // found a node by name, go to it
      let nodeId = node.data('nodeId');
      if (nodeId) {
        this.gotoNodeId(nodeId, transitionName);
      }
    }
  }

  /**
   * Go to a node by id, setting the url hash to #<nodeId>,<transitionName>.
   *
   * @param {string} nodeId - id of node to go to.
   * @param {string} transitionName - name of transition to use when going to node.
   */
  gotoNodeId (nodeId, transitionName) {
    if (this.options.hashState) {
      // using hash state, set hash in url
      document.location.hash = [nodeId, transitionName].join(',');
    }

    this.gotoNode(nodeId, transitionName);
  }

  /**
   * Use transition to show a node given by id.
   *
   * @param {string} nodeId - id of node to show.
   * @param {string} transition - transition to use for showing node.
   */
  showNewNode (nodeId, transition) {
    // node to display
    let newNode = this.element.find('#clickventure-node-' + nodeId);

    // start transition
    newNode.velocity(transition.show.fx, {
      duration: 200,
      complete: (function () {
        // make node active
        newNode.addClass('clickventure-node-active');

        // transition node in
        newNode.find('.clickventure-node-link').velocity('transition.slideDownIn', {
          duration: 300,
          stagger: 100,
        });

        // prep node
        window.picturefill(newNode);

        // trigger page change complete event
        this.element.trigger('clickventure-page-change-complete', [this]);
      }).bind(this),
    });
  }

  /**
   * Go to a given node by id.
   *
   * @param {string} nodeId - id of node to go to.
   * @param {string} transitionName - name of transition to use when going to node.
   */
  gotoNode (nodeId, transitionName) {

    // find active node, and transition to use
    let activeNode = this.element.find('.clickventure-node-active');
    let transition = NODE_TRANSITIONS[transitionName || 'default'];

    // align with top of node
    this.alignWithTop();

    // trigger page change event
    this.element.trigger('clickventure-page-change-start', [this]);

    // hide existing page if there is one
    if (activeNode.length > 0) {
      // start transition
      activeNode.velocity(transition.hide.fx, {
        duration: 200,
        complete: (function () {

          // hide existing node
          activeNode.removeClass('clickventure-node-active');

          // transition into new node
          this.showNewNode(nodeId, transition);

        }).bind(this),
      });
    }
    else {
      this.showNewNode(nodeId, transition);
    }
  }
}
