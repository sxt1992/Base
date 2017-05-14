import React from 'react';
import { Link } from 'react-router';

const Boys = React.createClass({
  render() {
    return (
      <div>
        Boys is very smart !!!
        <span onClick={this.goBack}>返回首页</span>
      </div>
    );
  },
  goBack() {
    window.history.go(-1);
  }
});

export default Boys;