import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,IndexRoute ,Redirect} from 'react-router';
import App from './js/component/App';
import Boys from './js/component/Boys';
import Girls from './js/component/Girls';
import Home from './js/component/Home';
import Inbox from './js/component/Inbox';


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>	
			<Route path="boys" component={Boys} />
			<Route path="girls" component={Girls} />
		</Route>
		<Route path="/inbox" component={Inbox}>
			<Redirect from="messages/:id" to="/messages/:id" />
		</Route>
	</Router>,
	document.getElementById("app"));