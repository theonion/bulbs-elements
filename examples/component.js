import React from 'react';
import { browserHistory } from 'react-router';
import examples from './element-examples';

const DEVICES = {
  desktop: {
    width: '1000px',
  },
  tablet: {
    width: '600px',
  },
  mobile: {
    width: '320px',
  },
};

function Checkerboard () {
  let gridSize = 8;
  let gridColor = '#fafafa';
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
		>
			<defs>
				<pattern
					id="checkerboard"
					x="0"
					y="0"
					width={gridSize * 2}
					height={gridSize * 2}
					patternUnits="userSpaceOnUse"
				>
					<rect
						fill={gridColor}
						x="0"
						y="0"
						width={gridSize}
						height={gridSize}
					/>
					<rect
						fill={gridColor}
						x={gridSize}
						y={gridSize}
						width={gridSize}
						height={gridSize}
					/>
				</pattern>
			</defs>
			<rect
				fill="url(#checkerboard)"
				x="0"
				y="0"
				width="100%"
				height="100%"
			/>
		</svg>
	);
}

class ExampleViewport extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
			scale: 1,
			workspace: 1,
		};
  }

  setDevice (device) {
    let segments = [
      'example',
      this.props.params.element,
      this.props.params.example,
      device,
    ];

    console.log('/' + segments.join('/'), {});
    browserHistory.push('/' + segments.join('/'), {});
  }

  setScale(event) {
    this.setState({
			scale: event.target.value,
		});
  }

  setWorkspace(event) {
    this.setState({
			workspace: event.target.value,
		});
  }

  render () {
    return (
      <div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
				}}
			>
        <header
          style={{
            background: '#fcc',
            fontFamily: 'Rokkitt',
						position: 'relative',
						zIndex: 1,
          }}
        >
          <button
            onClick={this.setDevice.bind(this, 'desktop')}
          >
            <i className="fa fa-desktop"/>
          </button>
          <button
            onClick={this.setDevice.bind(this, 'tablet,mobile')}
          >
            <i className="fa fa-tablet"/>
            <i className="fa fa-mobile-phone"/>
          </button>

					<label>Scale</label>
					<input
						type="range"
						min="0.1"
						max="2"
						step="0.01"
						value={this.state.scale}
						onChange={this.setScale.bind(this)}
					/>
					<input size="4" value={parseInt(this.state.scale * 100) + '%'} disabled />

					<label>Workspace</label>
					<input
						type="range"
						min="0.5"
						max="2"
						step="0.01"
						value={this.state.workspace}
						onChange={this.setWorkspace.bind(this)}
					/>
					<input size="4" value={parseInt(this.state.workspace * 100) + '%'} disabled />
        </header>
				<div
					style={{
						position: 'relative',
						flexGrow: 1,
					}}
				>
					<Checkerboard/>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							transform: `scale(${this.state.scale})`,
							transformOrigin: 'top left',
							width: 220 * this.state.workspace + '%',
							height: '100%',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						{
							this.props.params.device.split(',').map((device) => {
								return (
									<iframe
										style={{
											width: DEVICES[device].width,
											minWidth: DEVICES[device].width,
											margin: '0 auto',
											marginTop: 8,
											border: 'none',
										}}
										src={this.props.componentPath}
									/>
								)
							})
						}
					</div>
				</div>
      </div>
    );
  }
}

export class RenderComponent extends React.Component {
  renderExample () {
    let example = examples.find((anExample) => {
      return anExample.element === this.props.params.element;
    });
    return {
      __html: example.examples[this.props.params.example].render(),
    };
  }

	render () {
    try {
			return <div dangerouslySetInnerHTML={this.renderExample()} />;
    }
    catch (error) {
      let knownError;
      switch (error.message) {
        case "Cannot read property 'render' of undefined":
          knownError = "The example for this url does not exist."
          break;
      }
      return (
        <div
          style={{
            padding: '1em',
          }}
        >
          <code>
            <h1
              style={{
                color: 'red',
              }}
            >
              Failed to render example at:
            </h1>
            <a href={location.href}>
              { location.href }
            </a>

            <h2
              style={{
              }}
            >
              {knownError}
            </h2>

            <hr/>
            {
              error.stack.split('\n').map((line) => {
                return (
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {line}
                  </div>
                );
              })
            }
          </code>
        </div>
      );
    }
	}
}

export class Component extends React.Component {
	buildComponentPath () {
		return '/' + [
			'render-example',
			this.props.params.element,
			this.props.params.example,
		].join('/');
	}

  render () {
		return (
			<ExampleViewport
				params={this.props.params}
				componentPath={this.buildComponentPath()}
			>
			</ExampleViewport>
		);
  }
}
