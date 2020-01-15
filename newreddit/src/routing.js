import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import views from './views/index.js';

const router = (
	<Router>
		<Switch>
			<Route exact path="/" component={views.Home}></Route>
			<Route path="/login" component={views.Login}></Route>
			<Route path="/signup" component={views.Signup}></Route>
			<Route exact path="/communities" component={views.Communities}></Route>
			<Route
				exact
				path="/communities/:handle"
				component={views.Community}
			></Route>
			<Route exact path="/create" component={views.Create}></Route>
			<Route path="/create/community" component={views.CreateCommunity}></Route>
			<Route path="/post" component={views.CreatePost}></Route>
			<Route
				path="/communities/:handle/post/:id"
				component={views.Post}
			></Route>
		</Switch>
	</Router>
);

export default router;
