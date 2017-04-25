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

    if (this.props.title == "TOP PERFORMERS") {
      return (
        <div className = "top_performers">
          <Title title={title} />
        </div>
      );
    } else if (this.props.title == "PAID vs. ORGANIC") {
      return (
        <div>
          <Title title={title} />
        </div>
      );
    } else if (this.props.title == "DEVICES") {
      return (
        <div className = "devices">
          <Title title={title} />
        </div>
      );
    }
    else {
      return (
        <div className = "views_interactions">
          <Title title={title} />
          <StackedBars title="DAILY" />
          <StackedBars title="WEEKLY" />
          <StackedBars title="MONTHLY" />
        </div>
      );
    }
  }
}