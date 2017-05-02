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
            "Paid",
            "Organic",
        ],
        datasets: [
            {
                data: [100, 50],
                backgroundColor: [
                    "#96d8ff",
                    "#368bbb",
                ],
                hoverBackgroundColor: [
                    "#96d8ff",
                    "#368bbb",
                ]
            }]
    };


    if (this.props.title == "TOP PERFORMERS") {
      return (
        <div className="top_performers">
          <Title title={title} />
        </div>
      );
    } else if (this.props.title == "PAID vs. ORGANIC") {
      return (
        <div className = "paid_vs_organic">
          <Title title={title} />
          <Doughnut data={paid_or_organic} />
        </div>
      );
    } else if (this.props.title == "DEVICES") {
      return (
        <div className = "devices">
          <Title title={title} />
          <Doughnut data={paid_or_organic} />
        </div>
      );
    }
    else {
      return (
        <div className = "views_interactions">
          <Title title={title} />
          <div className="views_interactions_content">
            <div className="donut">
              <Doughnut data={paid_or_organic} />  
            </div>      
            <div className="stacked_bars">
              <StackedBars title="DAILY" id={title} />
              <StackedBars title="WEEKLY" id={title} />
              <StackedBars title="MONTHLY" id={title} />
            </div>
          </div>
          <hr></hr>
        </div>
      );
    }
  }
}