import React from 'react';
import {Title} from './Title';
import {StackedBars} from './StackedBars';
import {Doughnut} from 'react-chartjs-2';
import {PieChart, Pie, Legend, Tooltip, Sector, Cell} from 'recharts';
import ReactDataGrid from 'react-data-grid';

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let test_columns = [
        { key: 'video', name: 'VIDEO' },
        { key: 'platform', name: 'PLATFORM' },
        { key: 'publish_date', name: 'DATE' },
        { key: 'views', name: 'VIEWS' },
        { key: 'interactions', name: 'INTERACTIONS' }];
    let test_data = [
        { video: 'Video 1', platform: "Facebook", publish_date: "03/10/17", views: "####", interactions: "####"},
        { video: 'Video 2', platform: "Youtube", publish_date: "05/05/17", views: "####", interactions: "####"},
        { video: 'Video 3', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 4', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 5', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 6', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 8', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 9', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"},
        { video: 'Video 10', platform: "Facebook", publish_date: "04/28/17", views: "####", interactions: "####"} ];

    const rowGetter = rowNumber => test_data[rowNumber];

    const title = this.props.title;
    const COLORS = ['#96d8ff', '#368bbb', '#59a7d3'];
    let paid_organic = [{name: 'Paid', value: 400}, {name: 'Organic', value: 300}];
    let devices = [{name: 'Web', value: 2400}, {name: 'Mobile', value: 4567}];
    let views = [{name: 'Facebook', value: 2400}, {name: 'Youtube', value: 4567},
                {name: 'On-site', value: 4567}];
    let interactions = [{name: 'Facebook', value: 2400}, {name: 'Youtube', value: 4567},
                        {name: 'On-site', value: 4567}];

    if (this.props.title == "TOP PERFORMERS") {
      return (
        <div className="top_performers">
          <Title title={title} />
          <ReactDataGrid id="top_performers_chart"
            columns={test_columns}
            rowGetter={rowGetter}
            rowsCount={test_data.length}
            minHeight={200} />
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
            <Pie data={views} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {views.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
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
            <Pie data={interactions} cx={65} cy={65} innerRadius={40} outerRadius={60} fill="black">
            {interactions.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
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