import React from 'react';

export class StackedBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bar">{this.props.title}</div>
    )
  }
}