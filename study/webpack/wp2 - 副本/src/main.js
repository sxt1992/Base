//main.js 
import React from 'react';
import ReactDOM from 'react-dom';
import Greeter from './Greeter';

import './main.css';
// import './com.scss';

ReactDOM.render(<Greeter />, document.getElementById('root'));

var img1 = document.createElement("img");
img1.src = require("./images/kl.jpg");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("./images/sdhy.jpg");
document.body.appendChild(img2);

var img3 = document.createElement("img");
img3.src = require("./images/xg.jpg");
document.body.appendChild(img3);