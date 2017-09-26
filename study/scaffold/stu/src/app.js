const app = document.getElementById('app');

const aa = 'this is test babel';
const bb = Object.assign({}, { tao: 'this is test babel-polyfill' });
// let cc = Symbol("this is test babel-polyfill");

const dd = 'nihao';
const ee = { [dd]: 'this is test babel-runtime' };

let str = '';

Object.entries(bb).forEach(([k, v]) => {
  str += `<br>${k}=${v}`;
});

Object.entries(ee).forEach(([k, v]) => {
  str += `<br>${k}=${v}`;
});

new Promise(resolve => resolve('this is test babel-runtime promise')).then((d) => {
  app.innerHTML = `${str}<br>${aa}<br>${d}`;
});
