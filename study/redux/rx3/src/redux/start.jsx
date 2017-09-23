import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider, connect } from 'react-redux';

import createSagaMiddleware from 'redux-saga';

let applyMiddleware = Redux.applyMiddleware;

class Counter extends React.Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
          <div>
            <span>{value}</span>
            <button onClick={onIncreaseClick}>Increase</button>
          </div>
        )
    }
}
var addFunc = function () {
    return {
        type: "addFunc"
    };
};

var mapDispatchToProps = function (dispatch) {
    return {
        onIncreaseClick(event) {
            dispatch(addFunc());
        }
    };
};
var mapStateToProps = function (state) {
    return {
        value:state.count
    };
};

let TodoList = connect(mapStateToProps,mapDispatchToProps)(Counter);


let reducer = function (state = { count: 0 }, action) {
    const count=state.count;
    switch (action.type) {
        case 'addFunc':
            return { count: count + 1 };
        default:
            return state;
    }
};

const sagaMiddleware = createSagaMiddleware();

const store = Redux.createStore(reducer,applyMiddleware( sagaMiddleware ));

sagaMiddleware.run(function*(){console.log(235)});

ReactDOM.render(
    <Provider store={store}>
        <TodoList />
    </Provider>,
    document.getElementById("container")
);