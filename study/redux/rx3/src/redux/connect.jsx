import React from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps,mapDispatchToProps)(Counter);