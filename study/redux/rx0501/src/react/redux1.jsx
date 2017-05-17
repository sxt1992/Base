import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
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
console.log(22222);
console.log(state);
    if (typeof state === 'undefined') {
        return [{
                text: "taoxuejiao",
                completed: false
            }];
    }
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
console.log(11111);
var store = Redux.createStore(todoReducer);
console.log(33333);

// -----------------
var App = React.createClass({
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
);