import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';
import {Doughnut} from 'react-chartjs-2';
import {PieChart, Pie, Legend, Tooltip, Sector, Cell} from 'recharts';


export class Section extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {

    const title = this.props.title;
    const COLORS = ['#96d8ff', '#368bbb', '#59a7d3'];
    let paid_organic = [{name: 'Paid', value: 400}, {name: 'Organic', value: 300}];
    let devices = [{name: 'Web', value: 2400}, {name: 'Mobile', value: 4567}];
    let views_interactions = [{name: 'Facebook', value: 2400}, {name: 'Youtube', value: 4567},
                              {name: 'On-site', value: 4567}];


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
          <PieChart width={125} height={125} >
            <Pie data={paid_organic} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {paid_organic.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
        </div>
      );
    } else if (this.props.title == "DEVICES") {
      return (
        <div className = "devices">
          <Title title={title} />
          <PieChart width={125} height={125} >
            <Pie data={devices} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {devices.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
        </div>
      );
    }else if (this.props.title == "VIEWS") {
      return (
        <div className = "views">
          <div className = "divider"></div>
          <Title title={title} />
          <div className="views_interactions_content">
            <div className="donut">
          <PieChart width={125} height={125} >
            <Pie data={views_interactions} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {views_interactions.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
            </div>      
            <div className="stacked_bars">
              <StackedBars title="DAILY" id={title} />
              <StackedBars title="WEEKLY" id={title} />
              <StackedBars title="MONTHLY" id={title} />
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className = "interactions">
          <div className = "divider"></div>
          <Title title={title} />
          <div className="views_interactions_content">
            <div className="donut">
          <PieChart width={125} height={125} >
            <Pie data={views_interactions} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {views_interactions.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
            </div>      
            <div className="stacked_bars">
              <StackedBars title="DAILY" id={title} />
              <StackedBars title="WEEKLY" id={title} />
              <StackedBars title="MONTHLY" id={title} />
            </div>
          </div>
        </div>
      );
    }
  }
}