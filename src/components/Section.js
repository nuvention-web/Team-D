import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';
import {Doughnut} from 'react-chartjs-2';



export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;
    let data = {};
    let paid_or_organic = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

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
          <Doughnut data={paid_or_organic} />
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