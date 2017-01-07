import React from "react";

export default class HappeningToday extends React.Component {
  render() {
    return (
		<div id="module-home_today">
			<div class="row headline">
				<h1>Happening Today</h1>

				<div id="module-location">
					<i class="location"></i>
					<div class="city">Los Angeles, CA</div>
				</div>
			</div>

		{/* <div class="results">
		<script id="today_events-template" type="text/x-handlebars-template">
		{{#each this}}
		<div class="row post" data-id="{{ id }}">
		<div class="row featured_image">
		<img src="assets/img/posts/{{ featured_image }}" alt="">
		</div>

		<div class="row copy">
		<div class="date left">
		<h2>{{ day }}</h2>
		<h3>{{ date }}</h3>
		</div>
		<div class="right desc">
		<h4>{{ title }}</h4>
		<p>{{ time }} - {{ location }}</p>
		</div>
		</div>
		</div>
		{{/each}}
		</script>
		</div>
		*/}

		</div>
    );
  }
}


