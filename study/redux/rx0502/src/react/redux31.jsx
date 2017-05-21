// React-Router 路由库 31
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {Router,Route,IndexRoute,Link,IndexLink,hashHistory,browserHistory} from 'react-router';

// React component
/*class Counter extends Component {
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

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)*/

class ZongDe extends Component {
  render() {
    return (
      <div>
        ZongDe 真 DFfe <Link to="/aa">to AA</Link> <br/>
        {this.props.children}
        ZongDe 真 DFe <Link to="/bb">to BB</Link> <br/>
      </div>
    )
  }
}
class AA extends Component {
  render() {
    return (
      <div>
        AAAAAAAAAAAA <br/>
      </div>
    )
  }
}
class BB extends Component {
  render() {
    return (
      <div>
        BBBBBBBBBBBB <br/>
        <IndexLink to="/" >to Home</IndexLink>
      </div>
    )
  }
}
class Home extends Component {
  render() {
    return (
      <div>
        HHHHHHHHHHHHHHH <br/>
      </div>
    )
  }
}

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={ZongDe} >
        <IndexRoute component={Home} />
        <Route path="/aa" component={AA}
        onEnter={
          function(){
            window.tao=arguments[0];
            console.log(arguments[0]);
          }
        } 
        />
        <Route path="/bb" component={BB} />
      </Route>
    </Router>,
    document.getElementById('wrapper')
);