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

export const VisualCue = (props) => {
  return (
    <div className="visualCue">
      <ProgressLabel
            style={{display: props.isFB ? 'block' : 'none', top: "120px"}}
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
            <text data-tip data-for="score" x="200" y="230" style={textStyle2}>39.39</text>
      </ProgressLabel>

      <ReactTooltip id="1" effect='solid'>
        <span>Total Video Reach</span>
        <ul>
          <li>Facebook: 1711</li>
          <li>Instagram: 291</li>
        </ul>
      </ReactTooltip>
    </div>

  )
}