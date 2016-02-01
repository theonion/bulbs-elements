import React from 'react';
import BulbsElement from 'bulbs-elements/bulbs-element';
import ClickventureEditStore from './store';
import { nodes } from './article.json';
import register from 'bulbs-elements/register';
import classnames from 'classnames';
import './styles.scss';

class ClickventureEdit extends BulbsElement {
  initialDispatch () {
    this.store.actions.setNodes(nodes);
  }

  render () {
    let {
      nodes,
      highlightedNode,
    } = this.state;

    let {
      highlightNode,
    } = this.store.actions;

    highlightedNode = nodes[highlightedNode.id];

    return (
      <div>
        <div className="clickventure-edit-nodes-list">
          <ol>
            {
              Object.keys(nodes).map((key) => {
                let node = nodes[key];
                let isSelected = false;
                if (highlightedNode) {
                  isSelected = node.id === highlightedNode.id;
                }
                let classes = classnames('clickventure-edit-nodes-list-item', {
                  'clickventure-edit-nodes-list-item-selected': isSelected,
                });
                let statusClass = classnames('clickventure-edit-nodes-list-item-status', {
                  'clickventure-edit-nodes-list-item-status-start': node.start,
                  'clickventure-edit-nodes-list-item-status-finish': node.finish,
                });
                return <li className={classes} onClick={highlightNode.bind(null, node)}>
                  <div className={statusClass}></div>
                  <div>
                    {node.title}
                  </div>
                  <div></div>
                </li>
              })
            }
          </ol>
        </div>
        { highlightedNode ? this.renderEditPane(highlightedNode) : <div/> }
      </div>
    );
  }

  renderEditPane (node) {
    let {
      toggleNodeStart,
      toggleNodeFinish,
    } = this.store.actions;
    return (
      <div className="clickventure-edit-pane">
        <div>
          <label>Page Name (Internal Use)</label>
          <input value={node.title} />
        </div>
        <div>
          <button>Clone Page</button>
        </div>
        <div>
          <label>Select Page Type</label>
          <button onClick={toggleNodeStart.bind(null, node)}>
            [{node.start ? 'x' : ' '}] Start
          </button>
          <button onClick={toggleNodeFinish.bind(null, node)}>
            [{node.finish ? 'x' : ' '}] End
          </button>
        </div>
      </div>
    )
  }
}

ClickventureEdit.store = ClickventureEditStore;

register('clickventure-edit', ClickventureEdit);

function radians (degrees) {
// Converts from degrees to radians.
  return degrees * Math.PI / 180;
}

function degrees (radians) {
  return radians * 100 / Math.PI;
}

function pointOnCircle (degrees, cx, cy, radius) {
  return {
    x: cx + radius * Math.cos(radians(degrees)),
    y: cy + radius * Math.sin(radians(degrees)),
  };
}

class ClickventureViz extends BulbsElement {
  initialDispatch () {
    this.store.actions.setNodes(nodes);
  }

  hoverNode (node) {
    this.store.actions.highlightNode(node);
  }

  render () {
    let {
      nodes,
      highlightedNode,
    } = this.state;

    let keys = Object.keys(nodes);
    let degreesPerItem = 360 / keys.length

    return (
      <div style={{ position: 'relative', left: 250, top: 300 }}>
        <div className="clickventue-edit-nodelist" style={{width: 500, height: 500, position: 'absolute'}}>
          {
            keys.map((key, index) => {
              let node = nodes[key];
              let degrees = index * degreesPerItem;
              let position = pointOnCircle(degrees, 300, 300, 300);
              node.position = position;
              let currentNode = node.id === highlightedNode.id;
              let style = {
                transform: `
                  translateX(${position.x}px)
                  translateY(${position.y}px)
                  rotate(${degrees}deg)
                  scale(0.7)
                `,
                position: 'absolute',
                transformOrigin: 'left',
                listStyle: 'none',
              };
              let spanStyle = {
                cursor: 'crosshair',
              };
              if (index > keys.length / 4 && index < ((keys.length / 4) * 3) ) {
                spanStyle.marginRight = 10;
                style.transform += `
                  rotateZ(180deg) translateX(-100%)
                `;
              }
              else {
                spanStyle.marginLeft = 10;
              }
              if (currentNode) {
                style.fontWeight = 'bold';
              }
              return (
                <div key={key} style={style} onMouseOver={this.hoverNode.bind(this, node)}>
                  <span style={spanStyle}>
                    {node.title}
                  </span>
                </div>
              )
            })
          }
        </div>
        <svg style={{pointerEvents: 'none', width: 600, height: 600, position: 'relative', top: 10, left: 0}}>
          <g>
            {
              keys.map((key, index) => {
                let node = nodes[key];
                return node.links.map((link) => {
                  let from = nodes[link.from_node];
                  let to = nodes[link.to_node];
                  let strokeColor = "gray";
                  let strokeWidth = 0.25;

                  if (from && to ) {
                    if (from.id === highlightedNode.id) {
                      strokeColor = "green";
                      strokeWidth = 4;
                    }
                    if (to.id === highlightedNode.id) {
                      strokeColor = "red";
                      strokeWidth = 2;
                    }
                    return <path
                      d={`
                        M${from.position.x},${from.position.y}
                        Q300,300
                        ${to.position.x},${to.position.y}
                      `}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                    />
                  }
                  else {
                    return null;
                  }
                })
              })
            }
          </g>
        </svg>
      </div>
    );
  }

}

ClickventureViz.store = ClickventureEditStore;

register('clickventure-viz', ClickventureViz);
