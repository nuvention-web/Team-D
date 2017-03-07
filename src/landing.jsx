import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

export default class Landing extends React.Component {
	constructor(){
		super();
		this.state = {
			isValid: false
		}
	}

	handleStats(){
		this.setState({

			isValid: true
		});

	}


	render(){
	if (!this.state.isValid) 	
	return (


		<div className = "Landing"><a href = "#" onClick = {this.handleStats.bind(this)}>Video Stats</a></div>
		)
		else{
			return (
				<div className = 'Landing' >
				<App />
				</div>
				)
		}	
	}


	

}








render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));


