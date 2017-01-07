import React from "react";
import {Link} from "react-router";

import Preloader from "../components/Preloader"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

export default class Layout extends React.Component {
	render() {
		return (
		  <div id="main-container">
		  	{/*<Preloader />*/}
		  	<Header />

		  		<div id="main">
		  			{this.props.children}
		  		</div>
		  	
		  	<Footer />
		  </div>
		);
	}
}
