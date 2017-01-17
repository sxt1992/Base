import React from 'react';
import { Link } from 'react-router';

const App = React.createClass({
  render() {
    return (
      <div>
        Hello, React Router App !!!
        <Link to="Boys">男神</Link>
        <br/>
        <br/>
        <Link to="Girls">女神</Link>
        {this.props.children}
      </div>
    );
  }  
});

export default App;