import React from 'react';

export class StackedBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div>{this.props.title}</div>
      <div> hi!!</div>
     </div>
    )
  }
}