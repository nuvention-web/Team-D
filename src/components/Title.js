import React from 'react';

export class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}