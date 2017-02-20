import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory,IndexRoute ,Redirect} from 'react-router';
import App from './js/component/App';
import Boys from './js/component/Boys';
import Girls from './js/component/Girls';
import Home from './js/component/Home';
import Inbox from './js/component/Inbox';


ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="/Boys" component={Boys}/>
  		<Route path="/Girls" component={Girls}/>
	</Router>,
	document.getElementById("app"));