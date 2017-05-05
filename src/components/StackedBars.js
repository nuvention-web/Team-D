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

    if(this.props.id == "VIEWS"){
      if(this.props.title == "DAILY") {
        
        // pull # views here
        current_num = "111"
        last_num = "222"
        best_num = "333"

        current = {
          background: "#dce5ff",          
          //convert num to size
          width: "80px"
        }
        last = {
          background: "#b2bbff", 
          width: "90px"
        }
        best = {
          background: "#8993d5", 
          width: "140px"
        }
      }
      if(this.props.title == "WEEKLY") {
        current_num = "112"
        last_num = "223"
        best_num = "334"
        current = {
          background: "#dce5ff", 
          width: "80px"
        }
        last = {
          background: "#b2bbff", 
          width: "82px"
        }
        best = {
          background: "#8993d5", 
          width: "140px"
        }
      }
      if(this.props.title == "MONTHLY") {
        current_num = "113"
        last_num = "224"
        best_num = "335"
        current = {
          background: "#dce5ff", 
          width: "80px"
        }
        last = {
          background: "#b2bbff", 
          width: "100px"
        }
        best = {
          background: "#8993d5", 
          width: "140px"
        }
      }
    }
    
    if(this.props.id == "INTERACTIONS"){
      if(this.props.title == "DAILY") {
        current_num = "121"
        last_num = "232"
        best_num = "343"
        current = {
          background: "#bcfef3",
          //pull data here and convert to size
          width: "40px"
        }
        last = {
          background: "#92d3c8",
          width: "80px"
        }
        best = {
          background: "#6aa99f",
          width: "140px"
        }
      }
      if(this.props.title == "WEEKLY") {
        current_num = "3149580"
        last_num = "2390938"
        best_num = "239408901"

        current = {
          background: "#bcfef3",
          width: "70px"
        }
        last = {
          background: "#92d3c8",
          width: "95px"
        }
        best = {
          background: "#6aa99f",
          width: "140px"
        }
      }
      if(this.props.title == "MONTHLY") {
        current_num = "99999"
        last_num = "8888"
        best_num = "77777"
        current = {
          background: "#bcfef3",
          width: "80px"
        }
        last = {
          background: "#92d3c8",
          width: "90px"
        }
        best = {
          background: "#6aa99f",
          width: "140px"
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