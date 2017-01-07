import React from "react";

export default class Preloader extends React.Component
{
	render() {
		return(
			<div id="preloader">
				<div id="preloader_logo"></div>

				<div class="cube-wrapper">
					<div class="cube-folding">
						<span class="leaf1"></span>
						<span class="leaf2"></span>
						<span class="leaf3"></span>
						<span class="leaf4"></span>
					</div>
				</div>

			</div>
		)
	}
}