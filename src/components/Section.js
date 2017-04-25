import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;

    return (
      <div>
        <Title title={title} />
        <StackedBars title="DAILY" />
        <StackedBars title="WEEKLY"/>
        <StackedBars title="MONTHLY"/>
      </div>
    )
  }
}