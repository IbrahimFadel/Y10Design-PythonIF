import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import views from "./views/index.js";

const router = (
	<Router>
		<Switch>
			<Route exact path="/" component={views.Home}></Route>
			<Route path="/login" component={views.Login}></Route>
			<Route path="/signup" component={views.Signup}></Route>
		</Switch>
	</Router>
);

export default router;
