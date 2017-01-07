import React 	from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

// Scripts
import $ 			from "jquery";
import TM 			from "gsap";


import Layout 	from "./pages/Layout";
import Home 	from "./pages/Home";
import Event 	from "./pages/Event";
import Search 	from "./pages/Search";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="event(/:event)" component={Event}></Route>
			<Route path="search" component={Search}></Route>
		</Route>
	</Router>
, app);
