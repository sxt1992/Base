import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

// action creator
var addTodoActions = function(text){
    return {
        type: 'add_todo',
        text: text
    };
};
var addTodoActions2 = function(text){
    return {
        type: 'add_todo2',
        text: text
    };
};
var initState = {one:[],two:[]};
// reducers
var todoReducer = function (state=initState, action) {
    switch (action.type) {
        case 'add_todo':
            return Object.assign({}, state, {
                    one: state.one.concat(action.text)
            });
        case 'add_todo2':
            return Object.assign({}, state, {
                    two: state.two.concat(action.text)
            });
        default:
            return state;
    }
};

var store = Redux.createStore(todoReducer);
// -----------------
var App = React.createClass({
    getInitialState: function () {
        return {
            items: store.getState().one,
            items2: store.getState().two
        };        
    },
    componentDidMount: function () {
        var unsubscribe = store.subscribe(this.valChange);
    },
    valChange: function () {
        this.setState({
            items: store.getState().one,
            items2: store.getState().two
        });
    },
    handleAdd: function () {
        var input = ReactDOM.findDOMNode(this.refs.todo);
        var value = input.value.trim();
        if (value) {
            var arr = value.split(/\s+/);
            store.dispatch(addTodoActions(arr[0]));
            if (arr.length > 1) {
                store.dispatch(addTodoActions2(arr[1]));
            }
        }
        input.value = '';
    },
    render: function () {
        return (
            <div>
                <input ref="todo" type="text" placeholder="输入todo项" style={{ marginRight: '10px' }} />
                <button onClick={this.handleAdd}>点击添加</button>
                <ul>
                    {this.state.items.map(function (item, index) {
                        return <li key={'mykey' + index}>{item}</li>;
                    })}
                </ul>
                <hr />

                <ul>
                    {this.state.items2.map(function (item,index) {
                        return <li key={'mykey2' + index}>{item}</li>;
                    })}
                </ul>

            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('container')
);