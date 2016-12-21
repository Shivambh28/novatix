import React from "react";
import {Link} from "react-router";

export default class Layout extends React.Component {
	render() {
		return (
		  <div>
		  	{this.props.children}
		  	<footer>
				<Link to="">
					<div class="col" id="footer_home" >
						<i class="home"></i>
						<p>HOME</p>
					</div>
				</Link>
				<Link to="search">
					<div class="col" id="footer_search">
						<i class="search"></i>
						<p>EXPLORE</p>
					</div>
				</Link>
				<Link to="my-tickets">
					<div class="col" id="footer_tickets">
						<i class="tickets"></i>
						<p>MY TICKETS</p>
					</div>
				</Link>
				<Link to="settings">
					<div class="col" id="footer_settings">
						<i class="settings"></i>
						<p>SETTINGS</p>
					</div>
				</Link>
		    </footer>
		  </div>
		);
	}
}
