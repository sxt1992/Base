import Regular from 'regularjs';

var str = `
{#if username}
Hello , {username}. <a href="javascript:;" on-click={username = ''}>Logout</a>
{#else}
这全是数据"{xue}". Please <a href="javascript:;" on-click={this.login()}>Login</a>
{/if}
`;
var HelloRegular = Regular.extend({
    template: str,
    login: function(){
        var data = this.data; // get data    
        data.username = prompt("please enter your username", "")
    }
});
var com = new HelloRegular({
    data: {
        username: "marktao"
    }
});
com.$inject('#app','top');