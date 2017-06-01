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

  let data = this.props.data;
  let id = this.props.id;

    if(id == "VIEWS"){

        current_num = data.facebook.current + data.brightcove.current;
        last_num = data.facebook.last + data.brightcove.last;
        best_num =data.facebook.best + data.brightcove.best;

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
        current_num = data.facebook.current + data.brightcove.current;
        last_num = data.facebook.last + data.brightcove.last;
        best_num =data.facebook.best + data.brightcove.best;


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



    return (
      <div>
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