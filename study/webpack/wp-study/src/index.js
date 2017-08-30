import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = ['Hello', 'webpack'].join(' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    
    element.appendChild(btn);
    return element;
}
document.getElementById("app").appendChild(component());

console.log(JSON.stringify(module));

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('--------------------Accepting the updated printMe module!------------------');
        printMe();
    })
}