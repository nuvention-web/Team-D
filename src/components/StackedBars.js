import React from 'react';

export class StackedBars extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

  let current;
  let last;
  let best;
  let current_num;
  let last_num;
  let best_num;

  let title = this.props.title;
  let data = this.props.data;
  let id = this.props.id;

    if(id == "VIEWS"){
      if(title == "DAILY") {

        current_num = data.overall_views_sb.daily.current;
        last_num = data.overall_views_sb.daily.last;
        best_num = (current_num> last_num) ? current_num + 34 : last_num + 40;

        current = {
          background: "#dce5ff",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#b2bbff",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#8993d5",
          width: "70%"
        }
      }
    }
      if(title == "WEEKLY") {

        current_num = data.overall_views_sb.weekly.current;
        last_num = data.overall_views_sb.weekly.last;
        best_num = (current_num > last_num) ? current_num + 34 : last_num + 30;

        current = {
          background: "#dce5ff",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#b2bbff",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#8993d5",
          width: "70%"
        }
      }
      if(title == "MONTHLY") {

        current_num = data.overall_views_sb.monthly.current;
        last_num = data.overall_views_sb.monthly.last;
        best_num = (current_num > last_num) ? current_num + 34 : last_num + 40;

        current = {
          background: "#dce5ff",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#b2bbff",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#8993d5",
          width: "70%"
        }
    }

    if(id == "INTERACTIONS"){
      if(title == "DAILY") {
        current_num = data.overall_interactions_sb.daily.current;
        last_num = data.overall_interactions_sb.daily.last;
        best_num = (current_num > last_num) ? current_num + 34 : last_num + 50;


        current = {
          background: "#bcfef3",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#92d3c8",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#6aa99f",
          width: "70%"
        }
      }

      if(title == "WEEKLY") {
        current_num = data.overall_interactions_sb.weekly.current;
        last_num = data.overall_interactions_sb.weekly.last;
        best_num = (current_num > last_num) ? current_num + 34 : last_num + 10;
        
        current = {
          background: "#bcfef3",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#92d3c8",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#6aa99f",
          width: "70%"
        }
      }


      if(title == "MONTHLY") {

        current_num = data.overall_interactions_sb.monthly.current;
        last_num = data.overall_interactions_sb.monthly.last;
        best_num = (current_num > last_num) ? current_num + 34 : last_num + 45;

        current = {
          background: "#bcfef3",
          //convert num to size
          width: ((current_num/best_num)*70)+ "%"
        }
        last = {
          background: "#92d3c8",
          width: ((last_num/best_num)*70) + "%"
        }
        best = {
          background: "#6aa99f",
          width: "70%"
        }
      }
    }





    return (
      <div>
          <div>{this.props.title}</div>
          <div className= "bar_chart">
            <div className="current">
              <div className="bar_label">Current</div>
              <div className="bar" style={current} >{current_num}</div>
            </div>
            <div>
              <div className="bar_label">Last</div>
              <div className="bar" style={last}>{last_num}</div>
            </div>
            <div>
              <div className="bar_label">Best</div>
             <div className="bar" style={best}>{best_num}</div>
            </div>
          </div>
        </div>
    	);
    }
}