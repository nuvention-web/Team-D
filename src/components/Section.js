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

    const data = this.props.data;
    const title = this.props.title;
    //const timeframe = this.timeframe;
    const COLORS = ['#96d8ff', '#59a7d3', '#368bbb'];
    const VIEW_COLORS = ['#8993d5', '#dce5ff', '#b2bbff'];
    const INTER_COLORS = ['#6aa99f', '#bcfef3', '#92d3c8'];

    let top_performers_columns;
    let top_performers_data;
    const rowGetter = rowNumber => top_performers_data[rowNumber];

    if (title == "TOP PERFORMERS"){
      top_performers_columns = [
          { key: 'video', name: 'VIDEO' },
          { key: 'platform', name: 'PLATFORM' },
          // { key: 'publish_date', name: 'DATE' },
          { key: 'views', name: 'VIEWS' },
          { key: 'interactions', name: 'INTERACTIONS' }]

      top_performers_data = [
        { video: data[1].video, platform: data[1].platform, publish_date: data[1].publish_date, views: data[1].views, interactions: data[1].interactions},
        { video: data[2].video, platform: data[2].platform, publish_date: data[2].publish_date, views: data[2].views, interactions: data[2].interactions},
        { video: data[3].video, platform: data[3].platform, publish_date: data[3].publish_date, views: data[3].views, interactions: data[3].interactions},
        { video: data[4].video, platform: data[4].platform, publish_date: data[4].publish_date, views: data[4].views, interactions: data[4].interactions},
        { video: data[5].video, platform: data[5].platform, publish_date: data[5].publish_date, views: data[5].views, interactions: data[5].interactions},
        { video: data[6].video, platform: data[6].platform, publish_date: data[6].publish_date, views: data[6].views, interactions: data[6].interactions},
        { video: data[7].video, platform: data[7].platform, publish_date: data[7].publish_date, views: data[7].views, interactions: data[7].interactions},
        { video: data[8].video, platform: data[8].platform, publish_date: data[8].publish_date, views: data[8].views, interactions: data[8].interactions},
        { video: data[9].video, platform: data[9].platform, publish_date: data[9].publish_date, views: data[9].views, interactions: data[9].interactions},
        { video: data[10].video, platform: data[10].platform, publish_date: data[10].publish_date, views: data[10].views, interactions: data[10].interactions}
        ];
      }


    let paid_organic;
    if (title == "PAID vs. ORGANIC")
    {
      paid_organic = [{name: 'Paid', value: data.paid},
                      {name: 'Organic', value: data.organic}];
    }

    let devices;
    if(title == "DEVICES"){
      devices = [{name: 'Web', value: data.web},
                 {name: 'Mobile', value: data.mobile}];
    }


    // console.log("data", data)
    let views;
    if(title == "TOTAL VIEWS"){
      views = [{name: 'Facebook', value: data.facebook.current + data.facebook.best + data.facebook.last},
                {name: 'Brightcove', value: data.brightcove.current + data.brightcove.best + data.brightcove.last}];
    }

    let interactions;
    if(title == "TOTAL INTERACTIONS"){
      interactions = [{name: 'Facebook', value: data.facebook.current + data.facebook.best + data.facebook.last},
                      {name: 'Brightcove', value: data.brightcove.current + data.brightcove.best + data.brightcove.last}];
    }


    if (this.props.title == "TOP PERFORMERS") {
      return (
        <div className="top_performers">
          <Title title={title} />
          <ReactDataGrid id="top_performers_chart"
            columns={top_performers_columns}
            rowGetter={rowGetter}
            rowsCount={top_performers_data.length}
            minHeight={200} />
        </div>
      );
    } else if (this.props.title == "PAID vs. ORGANIC") {
      return (
        <div className = "paid_vs_organic">
          <Title title={title} />
          <PieChart width={225} height={200} >
            <Pie data={paid_organic} cx={70} cy={90} innerRadius={55} outerRadius={70} fill="black">
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
          <PieChart width={225} height={200} >
            <Pie data={devices} cx={70} cy={90} innerRadius={55} outerRadius={70} fill="black">
            {devices.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
        </div>
      );
    }else if (this.props.title == "TOTAL VIEWS") {
      return (
        <div className = "views">
          <div className = "divider"></div>
          <Title title={title} />
          <div className="views_interactions_content">
          <div className="donut">
          <div id="text">Breakdown by Platform</div>
          <PieChart width={150} height={150} >
            <Pie data={views} cx={70} cy={70} innerRadius={50} outerRadius={65} fill="black">
            {views.map((entry, index) => <Cell fill={VIEW_COLORS[index % VIEW_COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
            </div>
            <div className="stacked_bars">
              <StackedBars className="hoho" id={title} data={data} />
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
          <div id="text">Breakdown by Platform</div>
          <PieChart width={150} height={150} >
            <Pie data={interactions} cx={70} cy={70} innerRadius={50} outerRadius={65} fill="black">
            {interactions.map((entry, index) => <Cell fill={INTER_COLORS[index % INTER_COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
          </PieChart>
            </div>
            <div className="stacked_bars">
              <StackedBars id={title} data={data} />
            </div>
          </div>
        </div>
      );
    }
  }
}