// redux 中间件(包含异步)
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import ReduxPromise from 'redux-promise';
/*
let HelloMessage = React.createClass({
    render: function () {
        return (<div>陶雪城
            焦</div>);
    }
});
ReactDOM.render(
    <HelloMessage />,
    document.getElementById("tao")
);*/
// ---------------------------

// action creator
var addTodoActions = function(text){
    return {
        type: 'add_todo',
        text: text
    };
};

// reducers
var todoReducer = function (state, action) {
    if (typeof state === 'undefined') {
        return [];
    }
    console.log(action);
    switch (action.type) {
        case 'add_todo':
            return state.slice(0).concat({
                text: action.text,
                completed: false
            });
        default:
            return state;
    }
};

// var store = Redux.createStore(todoReducer);
let store = Redux.createStore(todoReducer, Redux.applyMiddleware(ReduxPromise));

/*function fetchPosts(dispatch) {
    return new Promise(function (resolve, reject) {
        fetch(`http://d.10jqka.com.cn/v4/time/hs_399005/last.js`).then(function (response) {
            dispatch({
                type: 'FETCH_POSTS',
                payload: response.text()
            });
        });
    });
}*/
console.log(123456);
// store.dispatch(fetchPosts(store.dispatch));

new Promise(function (resolve, reject) {
    fetch(`http://d.10jqka.com.cn/v4/time/hs_399005/last.js`).then(function (response) {
        store.dispatch({
            type: 'FETCH_POSTS',
            payload: response.text()
        });
    });
});


// -----------------
/*var App = React.createClass({
    getInitialState: function () {
        return {
            items: store.getState()
        };        
    },
    componentDidMount: function () {
        store.subscribe(this.valChange);
    },
    valChange: function () {
        this.setState({
            items: store.getState()
        });
    },
    handleAdd: function () {
        var input = ReactDOM.findDOMNode(this.refs.todo);
        var value = input.value.trim();
        if (value)
            store.dispatch(addTodoActions(value));
        input.value = '';
    },
    render: function () {
        return (
            <div>
                <input ref="todo" type="text" placeholder="输入todo项" style={{ marginRight: '10px' }} />
                <button onClick={this.handleAdd}>点击添加</button>
                <ul>
                    {this.state.items.map(function (item,index) {
                        return <li key={'mykey' + index}>{item.text}</li>;
                    })}
                </ul>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('wrapper')
);*/