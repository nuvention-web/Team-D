import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title />
        <StackedBars />
      </div>
    )
  }
}