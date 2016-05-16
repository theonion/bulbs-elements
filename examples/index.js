import React from 'react';
import { Link } from 'react-router';
import examples from './element-examples';
import inflection from 'inflection';

export default class Index extends React.Component {
  render () {
    return (
      <div className="examples-index">
        <div className="examples-index-list">
          <h1>
            <Link to="/">
              Examples
            </Link>
          </h1>
          <ul>
            {
              examples.map((group, index) => {
                return <li key={index} className="examples-example-group">
                  <code>
                    {`<${group.element}>`}
                  </code>
                  <ul>
                    {
                      Object.keys(group.examples).map((name) => {
                        return <li key={name} className="examples-example">
                          <Link
                            to={`/example/${group.element}/${inflection.dasherize(name)}/${this.props.params.device || 'tablet,mobile'}`} // eslint-disable-line max-len
                            activeClassName="active"
                          >
                            {group.examples[name].title}
                          </Link>
                        </li>
                      })
                    }
                  </ul>
                </li>
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

