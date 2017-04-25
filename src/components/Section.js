import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;
    const data = {};

    if (this.props.isTopPerformers) {
      return (
        <div>
          <Title title={title} />
          <StackedBars title="FACEBOOK" />
          <StackedBars title="OOYALA" />
          <StackedBars title="YOUTUBE" />
        </div>
      );
    } else if (this.props.isSources) {
      return (
        <div>
          <Title title={title} />
          <StackedBars data={data} />
        </div>
      );
    } else {
      return (
        <div>
          <Title title={title} />
          <StackedBars title="DAILY" />
          <StackedBars title="WEEKLY" />
          <StackedBars title="MONTHLY" />
        </div>
      );
    }
  }
}