import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import views from "./views/index.js";

const router = (
	<Router>
		<Switch>
			<Route exact path="/" component={views.Home}></Route>
		</Switch>
	</Router>
);

export default router;
