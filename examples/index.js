import React from 'react';
import { Link } from 'react-router';
import examples from './element-examples';
import inflection from 'inflection';

window.ga = function(){
  console.log(arguments);
};

export default class Index extends React.Component {
  render () {
    return (
      <div className="examples-index">
        <div className="examples-index-list">
          <h1>
            <Link to="/">
              <img src="/favicon.png" width="32"/>
            </Link>
          </h1>
          <ul>
            {
              examples.map((group, index) => {
                return (
                  <li key={index} className="examples-example-group">
                    <code>
                      {`<${group.element}>`}
                      <a
                        href={`http://localhost:9876/debug.html?grep=<${group.element}>`}
                        title='Open test suite'
                      >
                        <span style={{color: 'green', display: 'none'}}>
                          ✓
                        </span>
                        <span style={{color: 'red', display: 'none'}}>
                          ✖
                        </span>
                      </a>
                    </code>
                    <ul>
                      {
                        Object.keys(group.examples).map((name) => {
                          return (
                            <li key={name} className="examples-example">
                              <Link
                                to={`/example/${group.element}/${inflection.dasherize(name)}`}
                                activeClassName="active"
																title={group.examples[name].title}
                              >
                                {group.examples[name].title}
                              </Link>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="examples-index-pane">
          {this.props.children}
        </div>
      </div>
    );
  }
}
