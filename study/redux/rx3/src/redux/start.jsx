import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

/*function todoReducer() {
    console.log("---todoReducer---");
    console.log(arguments);
}

let store=Redux.createStore(todoReducer,Redux.applyMiddleware(promise));

function fetchPosts(dispatch) {
    return new Promise(function (resolve, reject) {
        console.log(1234566);
        return fetch(`http://d.10jqka.com.cn/v4/time/hs_399005/last.js`).then(function (response) {
            console.log(6543215);
            return dispatch({
                type: 'FETCH_POSTS',
                payload: response.text()
            });
        });
    });
}

window.x=store.dispatch(fetchPosts(store.dispatch));*/

import TodoList from './connect';
import reducer from './store';
import { Provider } from 'react-redux';

const store = Redux.createStore(reducer);

store.subscribe(function () {
    console.log(11111);
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <TodoList />
    </Provider>,
    document.getElementById("container")
);