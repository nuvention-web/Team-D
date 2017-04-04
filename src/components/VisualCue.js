import React from 'react';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';

const textStyle = {
  'fill': '#ffffff',
  'textAnchor': 'middle'
};
const textStyle2 = {
  'fill': '#FFDD57',
  'textAnchor': 'middle',
  'font-size': "50px"
};

export class VisualCue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="visualCue">
        <ProgressLabel
              style={{display: this.props.display ? 'block' : 'none', top: "120px"}}
              data-tip
              data-for="1"
              progress={100}
              startDegree={0}
              progressWidth={8}
              trackWidth={30}
              cornersWidth={4}
              size={400}
              fillColor="black"
              trackColor="white"
              progressColor="#3b5998">
              <text data-tip data-for="score" x="200" y="170" style={textStyle}>Nova Score:</text>
              <text data-tip data-for="score" x="200" y="230" style={textStyle2}>{this.props.data && (this.props.data[0].values[0].value / this.props.data[13].values[0].value * 100).toFixed(2)}</text>
        </ProgressLabel>

        <ReactTooltip id="1" effect='solid'>
          <span>Facebook</span>
          <ul>
            {this.props.data &&
              <div>
                <li>Total Video Count: {this.props.data[0].values[0].value}</li>
                <li>Lifetime Play Count: {this.props.data[13].values[0].value}</li>
              </div>
            }

          </ul>
        </ReactTooltip>
      </div>

    )
  }
}