import './sass/a.scss';
import React from 'react';
import ReactDOM from 'react-dom';

var aaa=null;
var GG=React.createClass({
    render(){
        aaa=this;
        return (<div xu="ting">
            <h6>rcn rcn rcn</h6>
        </div>);
    }
});

var Hello=React.createClass({
    getInitialState(){
        return {
            ths:7829
        };
    },
    handlerClick(event){
        this.setState({
            ths: this.state.ths+10
        });
        console.log(this.refs.t);
        console.log(this.refs.x===aaa);
        console.log(ReactDOM.findDOMNode(aaa));
    },
    render(){
        return (<div onClick={this.handlerClick}>
            <h1 ref="t">fdsaf{this.state.ths}dsafds</h1>
            <GG ref="x" />
        </div>);
    }
});
//var data=53;
ReactDOM.render(
    <Hello>
        <span>你span们吗?</span>
        <em>你ememem们吗?</em>
        这是普puTong通的文本
    </Hello>
    ,document.getElementById("wrapper"));