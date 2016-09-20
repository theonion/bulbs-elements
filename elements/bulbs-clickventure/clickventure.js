/* eslint babel/new-cap:0, valid-jsdoc:0 */
import { defaults } from 'lodash';
import velocity from '!imports?this=>window!velocity-animate';
import '!imports?this=>window!velocity-animate/velocity.ui';
import { getAnalyticsManager } from 'bulbs-elements/util';

velocity
  .RegisterUI('transition.turnPageIn', {
    defaultDuration: 200,
    calls: [
      [{
        opacity: [1, 0.5],
        transformPerspective: [800, 800],
        rotateY: [0, 'easeInQuad', 90],
      }],
    ],
    reset: {
      transformPerspective: 0,
    },
  })
  .RegisterUI('transition.turnPageOut', {
    defaultDuration: 200,
    calls: [
      [{
        opacity: [0.5, 1],
        transformPerspective: [800, 800],
        rotateY: [-90, 'easeInQuad'],
      }],
    ],
    reset: {
      transformPerspective: 0,
      rotateY: 0,
    },
  });

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

const DEFAULTS = {
  alignmentDuration: 300,
  alignmentOffset: -60,
};

export default class Clickventure {
  constructor (element, options) {
    let clickventure = this;
    let hash = window.location.hash;

    this.adsManager = window.BULBS_ELEMENTS_ADS_MANAGER;
    this.analyticsManager = getAnalyticsManager();
    this.element = element;
    this.options = defaults(options, DEFAULTS);
    this.nodeLinkButtons = this.element.find('.clickventure-node-link-button');
    this.restartButton = this.element.find('.clickventure-node-finish-links-restart');
    this.nodeClickCount = 0;

    this.nodeLinkButtons.each((i, el) => {
      let $element = $(el);
      $element.on('click', () => {
        let $dataContainer = $element.closest('.clickventure-node-link');
        let targetNode = $dataContainer.data('targetNode');
        let transitionName = $dataContainer.data('transition');

        clickventure.nodeClickCount++;
        clickventure.gotoNodeId(targetNode, transitionName);
        clickventure.analyticsManager.trackPageView(false, transitionName);
      });
    });

    this.restartButton.click(this.restart.bind(this));

    if (hash) {
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

  alignWithTop () {
    velocity(this.element, 'scroll', {
      duration: this.options.alignmentDuration,
      offset: this.options.alignmentOffset,
    });
  }

  getIdFromHash (hash) {
    return hash.match(/^#(.+),/)[1];
  }

  gotoHash (hash) {
    let hashParts = hash.split(',');
    let id = hashParts[0].replace(/^#/, '');
    let transition = hashParts[1];

    if (isNaN(id)) {
      this.gotoNodeNamed(id, transition);
    }
    else {
      this.gotoNode(id, transition);
    }
  }

  gotoStartNode (transitionName) {
    let startNodes = this.element.find('.clickventure-node-start');
    let node = startNodes[Math.floor(startNodes.length * Math.random())];

    if (node) {
      let nodeId = $(node).data('nodeId');
      if (nodeId) {
        this.gotoNodeId(nodeId, transitionName);
      }
    }
  }

  gotoNodeNamed (name, transitionName) {
    let node = this.element.find('[data-node-name="' + name + '"]');

    if (node.length) {
      let nodeId = node.data('nodeId');
      if (nodeId) {
        this.gotoNodeId(nodeId, transitionName);
      }
    }
  }

  gotoNodeId (nodeId, transitionName) {
    document.location.hash = [nodeId, transitionName].join(',');
    this.gotoNode(nodeId, transitionName);
  }

  showNewNode (nodeId, transition) {
    let newNode = this.element.find('#clickventure-node-' + nodeId);
    velocity(newNode[0], transition.show.fx, {
      duration: 200,
      complete: (function () {
        newNode.addClass('clickventure-node-active');
        let newNodeLink = newNode.find('.clickventure-node-link');
        velocity(newNodeLink[0], 'transition.slideDownIn', {
          duration: 300,
          stagger: 100,
        });
        window.picturefill(newNode);
        this.element.trigger('clickventure-page-change-complete', [this]);
      }).bind(this),
    });
    this.adRefresh();
  }

  gotoNode (nodeId, transitionName) {
    let activeNode = this.element.find('.clickventure-node-active');
    let transition = NODE_TRANSITIONS[transitionName || 'default'];

    this.alignWithTop();
    this.element.trigger('clickventure-page-change-start', [this]);

    if (activeNode.length > 0) {
      velocity(activeNode[0], transition.hide.fx, {
        duration: 200,
        complete: (function () {
          activeNode.removeClass('clickventure-node-active');
          this.showNewNode(nodeId, transition);
        }).bind(this),
      });
    }
    else {
      this.showNewNode(nodeId, transition);
    }
  }

  adRefresh () {
    if (this.nodeClickCount % 5 === 0) {
      this.adsManager.reloadAds();
    }
  }
}
