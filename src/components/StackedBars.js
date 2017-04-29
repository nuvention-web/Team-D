import React from 'react';

export class StackedBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    //VIEWS DATA
  	let views_daily_current = {
  		background: "#a4e3ff",
      width: "80px"

  	}
    let views_daily_last = {
      background: "#83bff0",
      width: "120px"
    }
    let views_daily_best = {
      background: "#5982a4",
      width: "140px"
    }

    //INTERACTIONS DATA
    let interactions_daily_current = {
      background: "#dffff2",
      width: "60px"
    }
    let interactions_daily_last = {
      background: "#8ff7c2",
      width: "100px"

    }
    let interactions_daily_best = {
      background: "#67bb98",
      width: "120px"
    }



  	if (this.props.id == "VIEWS"){
    	return (
   			<div>
      		<div>{this.props.title}</div>
      		<div className= "bar_chart">
            <div className="current">
              <div className="bar_label">Current</div>
      		    <div className="bar" style={views_daily_current}></div>
            </div>
            <div>
              <div className="bar_label">Last</div>
      			  <div className="bar" style={views_daily_last}></div>
            </div>
            <div>
              <div className="bar_label">Best</div>
      			 <div className="bar" style={views_daily_best}></div>
            </div>
      		</div>
     		</div>
    	);
	}
	else{
    	return (
      <div>
          <div>{this.props.title}</div>
          <div className= "bar_chart">
            <div className="current">
              <div className="bar_label">Current</div>
              <div className="bar" style={interactions_daily_current} ></div>
            </div>
            <div>
              <div className="bar_label">Last</div>
              <div className="bar" style={interactions_daily_last}></div>
            </div>
            <div>
              <div className="bar_label">Best</div>
             <div className="bar" style={interactions_daily_best}></div>
            </div>
          </div>
        </div>
    	);
	 }
  }
}