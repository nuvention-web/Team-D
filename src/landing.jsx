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
		<a href = "#" onClick = {this.handleStats.bind(this)}><img src={require("../images/logo2.png")} id = "logo_img55"/></a>
		)
		else{
			return (

				<App />

				)
		}
	}




}








render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));


