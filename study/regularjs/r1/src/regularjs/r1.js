import Regular from 'regularjs';

Regular.config({
    BEGIN: '{{',
    END: '}}'
});

var str = `
<div r-htmlt="{{aa}}">xuejiao</div>
<input type="text" r-model={{user.name}} >
{{user.name}}
<br>
<pager s={{start}} e={{end}}>内容</pager>
`;

Regular.extend({
    name: 'pager',
    template:"<div>fdsaf</div>"
});


var Com = Regular.extend({
    template: str
});

Regular.directive('r-htmlt', function (elem, value) {
    this.$watch(value, function (newValue) {
        elem.innerHTML = newValue;
    });
});

// Com.component('pager',pager);

window.t = new Com({
    data: {
        aa: "76gfd21",
        user: {
            name: "taoxj"
        }
    }
}).$inject('#app');
window.x = Com;