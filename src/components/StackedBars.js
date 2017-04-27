import React from 'react';

export class StackedBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
    <div>
      <div className="bar">{this.props.title}</div>
      <div ClassName= "bar_chart">
      	<div className="current_bar"></div>
      	<div className="last_bar"></div>
      	<div className="best_bar"></div>
      </div>
     </div>
    )
  }
}